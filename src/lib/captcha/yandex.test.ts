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
      .querySelectorAll('[id^="captcha-"], [class*="smartcaptcha"], script[data-captcha]')
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

  it('gives overlapping requests their own container and never runs them at once', async () => {
    // Container ids came from Date.now(), so two widgets created in the same
    // millisecond collided; cleanup then swept the document globally and tore
    // out the other widget's DOM. Both problems needed overlap to appear, so
    // the adapter now serialises and the ids are unique.
    const ids: string[] = [];
    const liveContainersAtRender: number[] = [];

    window.smartCaptcha = {
      render: vi.fn().mockImplementation((id: string, opts: SmartCaptchaOptions) => {
        ids.push(id);
        liveContainersAtRender.push(
          document.querySelectorAll('[id^="captcha-"]').length
        );
        setTimeout(() => opts.callback?.(`tok-${ids.length}`), 0);
        return ids.length;
      }),
      execute: vi.fn(),
      reset: vi.fn(),
    };

    const both = Promise.all([
      yandexAdapter.getToken('key'),
      yandexAdapter.getToken('key'),
    ]);
    await vi.advanceTimersByTimeAsync(10);

    await expect(both).resolves.toEqual(['tok-1', 'tok-2']);
    expect(new Set(ids).size).toBe(2);
    expect(liveContainersAtRender).toEqual([1, 1]);
  });

  it('cleans up only its own widget', async () => {
    const foreign = document.createElement('div');
    foreign.className = 'smartcaptcha-popup';
    document.body.appendChild(foreign);

    window.smartCaptcha = {
      render: vi.fn().mockImplementation((_id: string, opts: SmartCaptchaOptions) => {
        setTimeout(() => opts.callback?.('tok'), 0);
        return 7;
      }),
      execute: vi.fn(),
      reset: vi.fn(),
    };

    const p = yandexAdapter.getToken('key');
    await vi.advanceTimersByTimeAsync(0);
    await p;

    expect(document.body.contains(foreign)).toBe(true);
    expect(window.smartCaptcha!.reset).toHaveBeenCalledWith(7);
    expect(document.querySelectorAll('[id^="captcha-"]').length).toBe(0);
  });

  it('does not let one failure reject the request queued behind it', async () => {
    let call = 0;
    window.smartCaptcha = {
      render: vi.fn().mockImplementation((_id: string, opts: SmartCaptchaOptions) => {
        call++;
        const isFirst = call === 1;
        setTimeout(
          () => (isFirst ? opts['error-callback']?.() : opts.callback?.('ok')),
          0
        );
        return call;
      }),
      execute: vi.fn(),
      reset: vi.fn(),
    };

    const first = yandexAdapter.getToken('key');
    const second = yandexAdapter.getToken('key');
    const firstAssertion = expect(first).rejects.toThrow(/verification failed/);
    await vi.advanceTimersByTimeAsync(10);

    await firstAssertion;
    await expect(second).resolves.toBe('ok');
  });
});
