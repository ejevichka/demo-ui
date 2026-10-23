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
    registerAdapter('google', fake);
    await expect(getCaptchaToken('google', 'sk')).resolves.toBe('tok:sk');
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

    await expect(resolveCaptchaConfig(API)).resolves.toEqual({
      provider: 'google',
      siteKey: 'gk',
    });
    expect(getActiveProvider(API)).toBe('google');
  });

  it('accepts the flat shape as well as the envelope', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ provider: 'google', siteKey: 'gk' })
    );

    await expect(resolveCaptchaConfig(API)).resolves.toEqual({
      provider: 'google',
      siteKey: 'gk',
    });
  });

  it('accepts a backend that runs with the captcha switched off', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ result: { provider: 'none' } })
    );

    await expect(resolveCaptchaConfig(API)).resolves.toEqual({
      provider: 'none',
      siteKey: '',
    });
  });

  it('refuses a google config that carries no site key', async () => {
    // A half-finished rollout: CAPTCHA_PROVIDER=google is set, the site key is
    // not. There is nothing to substitute, and inventing one would fail later
    // in Google's words rather than ours.
    vi.spyOn(globalThis, 'fetch').mockImplementation(async () =>
      ok({ result: { provider: 'google' } })
    );

    const call = resolveCaptchaConfig(API);
    const assertion = expect(call).rejects.toThrow(/no site key/);
    await runBackoff();
    await assertion;
    expect(getActiveProvider(API)).toBeNull();
  });

  it('refuses a backend still answering yandex, and says what to set', async () => {
    // The adapter is gone; a leftover CAPTCHA_PROVIDER=yandex must surface as
    // a readable misconfiguration rather than a token nobody can verify.
    vi.spyOn(globalThis, 'fetch').mockImplementation(async () =>
      ok({ result: { provider: 'yandex', siteKey: 'ysc1_whatever' } })
    );

    const call = resolveCaptchaConfig(API);
    const assertion = expect(call).rejects.toThrow(/CAPTCHA_PROVIDER=google/);
    await runBackoff();
    await assertion;
  });

  it('fails immediately on 404 instead of retrying it', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('', { status: 404 }));

    await expect(resolveCaptchaConfig(API)).rejects.toThrow(/does not exist/);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('retries a 503 instead of giving up on it', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response('', { status: 503 }))
      .mockResolvedValue(ok({ result: { provider: 'google', siteKey: 'gk' } }));

    const call = resolveCaptchaConfig(API);
    await runBackoff();

    await expect(call).resolves.toEqual({ provider: 'google', siteKey: 'gk' });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('does not cache a failure, so a later call still sees a good config', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('', { status: 500 })
    );
    const failing = resolveCaptchaConfig(API);
    const rejected = expect(failing).rejects.toBeInstanceOf(CaptchaError);
    await runBackoff();
    await rejected;

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ result: { provider: 'google', siteKey: 'gk' } })
    );
    await expect(resolveCaptchaConfig(API)).resolves.toEqual({
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
      resolveCaptchaConfig(API),
      resolveCaptchaConfig(API),
    ]);

    expect(a).toEqual(b);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('falls back to the key this backend last handed out', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ result: { provider: 'google', siteKey: 'gk' } })
    );
    await resolveCaptchaConfig(API);

    // Drop the in-memory cache the way a page reload would, keep what was
    // learned, and make the endpoint unreachable.
    __resetCaptchaConfigCacheKeepingMemory();
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'));

    const call = resolveCaptchaConfig(API);
    await runBackoff();

    await expect(call).resolves.toEqual({ provider: 'google', siteKey: 'gk' });
    // Nothing was committed, so the next call probes again.
    expect(getActiveProvider(API)).toBeNull();
  });

  it('fails loudly when nothing is known and the probe is down', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'));

    const call = resolveCaptchaConfig(API);
    const assertion = expect(call).rejects.toThrow(/configuration unavailable/);
    await runBackoff();
    await assertion;
  });

  it('caches per API base, so one brand cannot hand another its key', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) =>
      String(input).startsWith('https://krups.test')
        ? ok({ result: { provider: 'google', siteKey: 'krups-key' } })
        : ok({ result: { provider: 'google', siteKey: 'beauty-key' } })
    );

    await expect(
      resolveCaptchaConfig('https://krups.test')
    ).resolves.toEqual({ provider: 'google', siteKey: 'krups-key' });
    await expect(
      resolveCaptchaConfig('https://beauty.test')
    ).resolves.toEqual({ provider: 'google', siteKey: 'beauty-key' });
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
