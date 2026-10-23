import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { yandexAdapter, YANDEX_SCRIPT_URL } from './yandex';
import { CaptchaError } from './types';
import { __markScriptLoaded, __resetScriptCacheForTests } from './loadScript';
// The options bag of the real SmartCaptcha render(), derived from the global
// declaration in ./yandex rather than retyped here, so a change to the SDK
// surface shows up as a type error in these fakes too.
type SmartCaptchaOptions = Parameters<
  NonNullable<Window['smartCaptcha']>['render']
>[1];


describe('yandexAdapter.getToken', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    __resetScriptCacheForTests();
    __markScriptLoaded(YANDEX_SCRIPT_URL);
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    delete window.smartCaptcha;
    document
      .querySelectorAll('[id^="captcha-"], [class*="smartcaptcha"]')
      .forEach((el) => el.remove());
  });

  it('rejects with CaptchaError on timeout', async () => {
    window.smartCaptcha = {
      render: vi.fn().mockReturnValue(1),
      execute: vi.fn(),
      reset: vi.fn(),
    };
    const p = yandexAdapter.getToken('key');
    const assertion = expect(p).rejects.toBeInstanceOf(CaptchaError);
    await vi.advanceTimersByTimeAsync(31_000);
    await assertion;
  });

  it('rejects with CaptchaError on verification failure', async () => {
    let errCb: (() => void) | undefined;
    window.smartCaptcha = {
      render: vi.fn().mockImplementation((_id: string, opts: SmartCaptchaOptions) => {
        errCb = opts['error-callback'];
        return 1;
      }),
      execute: vi.fn().mockImplementation(() => errCb?.()),
      reset: vi.fn(),
    };
    const p = yandexAdapter.getToken('key');
    const assertion = expect(p).rejects.toThrow(/verification failed/);
    await vi.advanceTimersByTimeAsync(600);
    await assertion;
  });

  it('resolves with the token from the success callback', async () => {
    window.smartCaptcha = {
      render: vi.fn().mockImplementation((_id: string, opts: SmartCaptchaOptions) => {
        setTimeout(() => opts.callback?.('tok-123'), 0);
        return 1;
      }),
      execute: vi.fn(),
      reset: vi.fn(),
    };
    const p = yandexAdapter.getToken('key');
    await vi.advanceTimersByTimeAsync(0);
    await expect(p).resolves.toBe('tok-123');
  });

  it('rejects with CaptchaError when the callback yields an empty token', async () => {
    window.smartCaptcha = {
      render: vi.fn().mockImplementation((_id: string, opts: SmartCaptchaOptions) => {
        setTimeout(() => opts.callback?.(''), 0);
        return 1;
      }),
      execute: vi.fn(),
      reset: vi.fn(),
    };
    const p = yandexAdapter.getToken('key');
    const assertion = expect(p).rejects.toThrow(/empty token/);
    await vi.advanceTimersByTimeAsync(0);
    await assertion;
  });
});
