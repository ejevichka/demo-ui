import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getCaptchaToken,
  registerAdapter,
  resolveCaptchaConfig,
  getActiveProvider,
  __resetCaptchaConfigCache,
} from './index';
import type { CaptchaAdapter } from './types';

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
    __resetCaptchaConfigCache();
  });

  afterEach(() => {
    __resetCaptchaConfigCache();
    vi.restoreAllMocks();
  });

  it('returns the server config on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ provider: 'google', siteKey: 'gk' }),
        {
          status: 200,
        }
      )
    );
    await expect(
      resolveCaptchaConfig('https://api.test', 'fallback-key')
    ).resolves.toEqual({ provider: 'google', siteKey: 'gk' });
  });

  it('falls back to yandex + attribute key on 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('nope', { status: 404 })
    );
    await expect(
      resolveCaptchaConfig('https://api.test', 'fallback-key')
    ).resolves.toEqual({ provider: 'yandex', siteKey: 'fallback-key' });
  });

  it('falls back when fetch throws', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'));
    await expect(
      resolveCaptchaConfig('https://api.test', 'fallback-key')
    ).resolves.toEqual({ provider: 'yandex', siteKey: 'fallback-key' });
  });

  it('exposes the committed provider via getActiveProvider on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ provider: 'google', siteKey: 'gk' }),
        {
          status: 200,
        }
      )
    );
    await resolveCaptchaConfig('https://api.test', 'fallback-key');
    expect(getActiveProvider('https://api.test')).toBe('google');
  });

  it('keeps getActiveProvider null after a transient failure (uncached)', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'));
    await resolveCaptchaConfig('https://api.test', 'fallback-key');
    // The fallback is returned for the attempt but NOT committed, so the
    // active provider must not falsely report 'yandex'.
    expect(getActiveProvider('https://api.test')).toBeNull();
  });

  it('resolves a Genkit-envelope-wrapped response (provider: google)', async () => {
    // Brand backends return Genkit-flow envelopes: { result: {...} }.
    // The widget must unwrap the top-level `result` before validation.
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          result: { provider: 'google', siteKey: 'gk' },
        }),
        { status: 200 }
      )
    );
    await expect(
      resolveCaptchaConfig('https://api.test', 'fallback-key')
    ).resolves.toEqual({ provider: 'google', siteKey: 'gk' });
    expect(getActiveProvider('https://api.test')).toBe('google');
  });

  it('resolves a Genkit-envelope-wrapped response (provider: none, no siteKey)', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ result: { provider: 'none' } }), {
        status: 200,
      })
    );
    await expect(
      resolveCaptchaConfig('https://api.test', 'fallback-key')
    ).resolves.toEqual({ provider: 'none', siteKey: 'fallback-key' });
  });

  // Regression guard for this app specifically: one bundle serves three brand
  // backends, and during a provider migration they are deliberately NOT on the
  // same provider. With a single cache slot the second brand would inherit the
  // first brand's provider and site key, and sign-in there would break with a
  // token the other vendor issued. Collapse the cache back to one slot and this
  // test is the only thing that goes red.
  it('caches per API base, so brands on different providers do not share a config', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = String(input);
      if (url.startsWith('https://krups.test')) {
        return new Response(
          JSON.stringify({ result: { provider: 'google', siteKey: 'gk' } }),
          { status: 200 }
        );
      }
      return new Response(
        JSON.stringify({ result: { provider: 'yandex', siteKey: 'yk' } }),
        { status: 200 }
      );
    });

    await expect(
      resolveCaptchaConfig('https://krups.test', 'fallback-key')
    ).resolves.toEqual({ provider: 'google', siteKey: 'gk' });
    await expect(
      resolveCaptchaConfig('https://beauty.test', 'fallback-key')
    ).resolves.toEqual({ provider: 'yandex', siteKey: 'yk' });

    expect(getActiveProvider('https://krups.test')).toBe('google');
    expect(getActiveProvider('https://beauty.test')).toBe('yandex');
  });
});
