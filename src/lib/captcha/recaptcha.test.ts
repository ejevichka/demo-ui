import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { recaptchaAdapter, recaptchaScriptUrl } from './recaptcha';
import { CaptchaError } from './types';
import { __markScriptLoaded, __resetScriptCacheForTests } from './loadScript';

describe('recaptchaAdapter.getToken', () => {
  beforeEach(() => {
    __resetScriptCacheForTests();
    __markScriptLoaded(recaptchaScriptUrl('site-key'));
  });
  afterEach(() => {
    vi.restoreAllMocks();
    delete window.grecaptcha;
    document
      .querySelectorAll('style[data-recaptcha-badge]')
      .forEach((el) => el.remove());
  });

  it('resolves with the v3 token via grecaptcha.execute', async () => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockResolvedValue('v3-token'),
    };
    await expect(recaptchaAdapter.getToken('site-key')).resolves.toBe(
      'v3-token'
    );
    expect(window.grecaptcha!.execute).toHaveBeenCalledWith(
      'site-key',
      { action: 'create_user' }
    );
  });

  it('rejects with CaptchaError when grecaptcha.execute throws', async () => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockRejectedValue(new Error('boom')),
    };
    await expect(
      recaptchaAdapter.getToken('site-key')
    ).rejects.toBeInstanceOf(CaptchaError);
    await expect(recaptchaAdapter.getToken('site-key')).rejects.toThrow(
      'reCAPTCHA verification failed: boom'
    );
  });

  it('wraps a non-Error throw without "undefined" in the message', async () => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockRejectedValue('string-failure'),
    };
    await expect(recaptchaAdapter.getToken('site-key')).rejects.toThrow(
      'reCAPTCHA verification failed: string-failure'
    );
  });

  it('injects a style that hides the grecaptcha badge (once)', async () => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn().mockResolvedValue('t'),
    };
    await recaptchaAdapter.getToken('site-key');
    await recaptchaAdapter.getToken('site-key');
    const styles = document.querySelectorAll('style[data-recaptcha-badge]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.grecaptcha-badge');
  });
});
