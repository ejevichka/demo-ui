import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { recaptchaAdapter, recaptchaScriptUrl } from './recaptcha';
import { CaptchaError } from './types';
import { __markScriptLoaded, __resetScriptCacheForTests } from './loadScript';

const SITE_KEY = 'site-key';

describe('recaptchaAdapter.getToken', () => {
  beforeEach(() => {
    __resetScriptCacheForTests();
    __markScriptLoaded(recaptchaScriptUrl(SITE_KEY));
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    delete window.grecaptcha;
    document
      .querySelectorAll('script[data-captcha], style[data-recaptcha-badge]')
      .forEach((el) => el.remove());
  });

  it('resolves with the v3 token via grecaptcha.execute', async () => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockResolvedValue('v3-token'),
    };
    await expect(recaptchaAdapter.getToken(SITE_KEY)).resolves.toBe(
      'v3-token'
    );
    expect(window.grecaptcha!.execute).toHaveBeenCalledWith(SITE_KEY, {
      action: 'create_user',
    });
  });

  it('rejects with CaptchaError when grecaptcha.execute throws', async () => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockRejectedValue(new Error('boom')),
    };
    await expect(
      recaptchaAdapter.getToken(SITE_KEY)
    ).rejects.toBeInstanceOf(CaptchaError);
    await expect(recaptchaAdapter.getToken(SITE_KEY)).rejects.toThrow(
      'reCAPTCHA verification failed: boom'
    );
  });

  it('wraps a non-Error throw without "undefined" in the message', async () => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockRejectedValue('string-failure'),
    };
    await expect(recaptchaAdapter.getToken(SITE_KEY)).rejects.toThrow(
      'reCAPTCHA verification failed: string-failure'
    );
  });

  it('leaves the grecaptcha badge visible', async () => {
    // Google allows hiding the badge only on pages that carry the reCAPTCHA
    // notice with Privacy Policy and Terms links. This app carries none, so
    // hiding it would break the terms of the key the demo runs on.
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockResolvedValue('t'),
    };
    await recaptchaAdapter.getToken(SITE_KEY);

    expect(
      document.querySelectorAll('style[data-recaptcha-badge]').length
    ).toBe(0);
  });

  it('times out the whole flow, not just execute, and frees the script for a retry', async () => {
    // A hung SDK fetch used to sit outside every timeout: the promise never
    // settled and the cached pending load made each retry hang the same way.
    vi.useFakeTimers();
    __resetScriptCacheForTests();

    const first = recaptchaAdapter.getToken(SITE_KEY);
    const assertion = expect(first).rejects.toThrow(/timed out/);
    await vi.advanceTimersByTimeAsync(31_000);
    await assertion;

    expect(
      document.querySelectorAll('script[data-captcha]').length
    ).toBe(0);
  });
});
