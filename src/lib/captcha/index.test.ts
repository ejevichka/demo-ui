import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getCaptchaToken,
  registerAdapter,
  resolveCaptchaConfig,
  getActiveProvider,
  __resetCaptchaConfigCache,
  CaptchaError,
} from './index';
import type { CaptchaAdapter } from './types';

const API = 'https://api.test';
const BUILD_KEY = 'ysc1_build_time_key';

/** One JSON answer, in the Genkit envelope the brand backends actually send. */
const ok = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status });

/** Drives the retry backoff (300ms + 900ms) without waiting for it. */
const runBackoff = () => vi.advanceTimersByTimeAsync(2_000);

describe('getCaptchaToken dispatch', () => {
  it("returns 'none' without calling any adapter when provider is none", async () => {
    const token = await getCaptchaToken('none', '');
    expect(token).toBe('none');
  });

  it('dispatches to the registered adapter for the provider', async () => {
    const fake: CaptchaAdapter = { getToken: async (k) => `tok:${k}` };
    registerAdapter('yandex', fake);
    await expect(getCaptchaToken('yandex', 'sk')).resolves.toBe('tok:sk');
  });
});

describe('resolveCaptchaConfig', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    __resetCaptchaConfigCache();
  });

  afterEach(() => {
    vi.useRealTimers();
    __resetCaptchaConfigCache();
    vi.restoreAllMocks();
  });

  it('returns the server config and remembers it', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ result: { provider: 'google', siteKey: 'gk' } })
    );

    await expect(resolveCaptchaConfig(API, BUILD_KEY)).resolves.toEqual({
      provider: 'google',
      siteKey: 'gk',
    });
    expect(getActiveProvider(API)).toBe('google');
  });

  it('accepts the flat shape as well as the envelope', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ provider: 'yandex', siteKey: 'yk' })
    );

    await expect(resolveCaptchaConfig(API, BUILD_KEY)).resolves.toEqual({
      provider: 'yandex',
      siteKey: 'yk',
    });
  });

  it('falls back to the build-time key only for yandex', async () => {
    // krups-develop answers exactly like this today: provider, no site key.
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ result: { provider: 'yandex' } })
    );

    await expect(resolveCaptchaConfig(API, BUILD_KEY)).resolves.toEqual({
      provider: 'yandex',
      siteKey: BUILD_KEY,
    });
  });

  it('never hands the build-time Yandex key to Google', async () => {
    // A half-finished rollout: CAPTCHA_PROVIDER=google is set, the site key is
    // not. Passing BUILD_KEY to grecaptcha.execute would fail in Google's
    // words, somewhere else entirely. Refuse here instead.
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ result: { provider: 'google' } })
    );

    const call = resolveCaptchaConfig(API, BUILD_KEY);
    const assertion = expect(call).rejects.toBeInstanceOf(CaptchaError);
    await runBackoff();
    await assertion;
    expect(getActiveProvider(API)).toBeNull();
  });

  it('treats 404 as the legacy answer and caches it', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('', { status: 404 }));

    await expect(resolveCaptchaConfig(API, BUILD_KEY)).resolves.toEqual({
      provider: 'yandex',
      siteKey: BUILD_KEY,
    });
    await resolveCaptchaConfig(API, BUILD_KEY);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('retries a 503 instead of committing to a fallback', async () => {
    // The old code cached the Yandex fallback on ANY non-ok status, so one bad
    // moment pinned the wrong provider until the tab was reloaded.
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response('', { status: 503 }))
      .mockResolvedValue(ok({ result: { provider: 'google', siteKey: 'gk' } }));

    const call = resolveCaptchaConfig(API, BUILD_KEY);
    await runBackoff();

    await expect(call).resolves.toEqual({ provider: 'google', siteKey: 'gk' });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('does not cache a failure, so a later call still sees the switch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('', { status: 500 })
    );
    const failing = resolveCaptchaConfig(API, BUILD_KEY);
    const rejected = expect(failing).rejects.toBeInstanceOf(CaptchaError);
    await runBackoff();
    await rejected;

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ result: { provider: 'google', siteKey: 'gk' } })
    );
    await expect(resolveCaptchaConfig(API, BUILD_KEY)).resolves.toEqual({
      provider: 'google',
      siteKey: 'gk',
    });
  });

  it('runs one probe for concurrent callers', async () => {
    // Two in-flight probes could settle in either order, and the loser used to
    // overwrite the winner's cache entry.
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(ok({ result: { provider: 'google', siteKey: 'gk' } }));

    const [a, b] = await Promise.all([
      resolveCaptchaConfig(API, BUILD_KEY),
      resolveCaptchaConfig(API, BUILD_KEY),
    ]);

    expect(a).toEqual(b);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('prefers the provider this backend last reported over the build-time key', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ result: { provider: 'google', siteKey: 'gk' } })
    );
    await resolveCaptchaConfig(API, BUILD_KEY);

    // Drop the in-memory cache the way a page reload would, keep what was
    // learned, and make the endpoint unreachable.
    __resetCaptchaConfigCacheKeepingMemory();
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'));

    const call = resolveCaptchaConfig(API, BUILD_KEY);
    await runBackoff();

    // Yandex here would mint a token the migrated backend rejects.
    await expect(call).resolves.toEqual({ provider: 'google', siteKey: 'gk' });
    expect(getActiveProvider(API)).toBeNull();
  });

  it('fails loudly when nothing is known and the probe is down', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'));

    const call = resolveCaptchaConfig(API, BUILD_KEY);
    const assertion = expect(call).rejects.toThrow(/configuration unavailable/);
    await runBackoff();
    await assertion;
  });

  it('caches per API base, so brands on different providers do not share a config', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) =>
      String(input).startsWith('https://krups.test')
        ? ok({ result: { provider: 'google', siteKey: 'gk' } })
        : ok({ result: { provider: 'yandex', siteKey: 'yk' } })
    );

    await expect(
      resolveCaptchaConfig('https://krups.test', BUILD_KEY)
    ).resolves.toEqual({ provider: 'google', siteKey: 'gk' });
    await expect(
      resolveCaptchaConfig('https://beauty.test', BUILD_KEY)
    ).resolves.toEqual({ provider: 'yandex', siteKey: 'yk' });

    expect(getActiveProvider('https://krups.test')).toBe('google');
    expect(getActiveProvider('https://beauty.test')).toBe('yandex');
  });
});

/** Clears the in-memory cache only, leaving what localStorage remembers. */
function __resetCaptchaConfigCacheKeepingMemory(): void {
  const remembered: [string, string][] = Object.keys(localStorage)
    .filter((k) => k.startsWith('captcha:last-good:'))
    .map((k) => [k, localStorage.getItem(k) as string]);

  __resetCaptchaConfigCache();
  remembered.forEach(([k, v]) => localStorage.setItem(k, v));
}
