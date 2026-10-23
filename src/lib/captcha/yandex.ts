import { CaptchaError, type CaptchaAdapter } from './types';
import { loadScriptOnce } from './loadScript';

export const YANDEX_SCRIPT_URL =
  'https://smartcaptcha.yandexcloud.net/captcha.js';
const CAPTCHA_TIMEOUT = 30_000;

declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        containerId: string,
        options: {
          sitekey: string;
          invisible?: boolean;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
        }
      ) => number;
      execute: (widgetId?: number) => void;
      reset: (widgetId?: number) => void;
    };
  }
}

async function ready(): Promise<void> {
  await loadScriptOnce(YANDEX_SCRIPT_URL);
  let attempts = 0;
  while (!window.smartCaptcha && attempts < 50) {
    await new Promise((r) => setTimeout(r, 100));
    attempts++;
  }
  if (!window.smartCaptcha) {
    throw new CaptchaError('SmartCaptcha not available after loading');
  }
}

export const yandexAdapter: CaptchaAdapter = {
  async getToken(siteKey: string): Promise<string> {
    await ready();

    const containerId = `captcha-${Date.now()}`;
    const container = document.createElement('div');
    container.id = containerId;
    container.style.display = 'none';
    document.body.appendChild(container);

    let widgetId: number | undefined;

    try {
      return await new Promise<string>((resolve, reject) => {
        let settled = false;
        // eslint-disable-next-line prefer-const -- assigned after render() below, whose callbacks capture it; const would risk a TDZ throw if error-callback fires synchronously
        let executeTimerId: ReturnType<typeof setTimeout> | undefined;
        const timeoutId = setTimeout(() => {
          if (!settled) {
            settled = true;
            clearTimeout(timeoutId);
            if (executeTimerId !== undefined)
              clearTimeout(executeTimerId);
            reject(
              new CaptchaError(
                'CAPTCHA timed out after 30 seconds'
              )
            );
          }
        }, CAPTCHA_TIMEOUT);

        try {
          widgetId = window.smartCaptcha!.render(containerId, {
            sitekey: siteKey,
            invisible: true,
            callback: (token: string) => {
              if (!settled) {
                settled = true;
                clearTimeout(timeoutId);
                if (executeTimerId !== undefined)
                  clearTimeout(executeTimerId);
                if (token) {
                  resolve(token);
                } else {
                  reject(
                    new CaptchaError(
                      'SmartCaptcha returned an empty token'
                    )
                  );
                }
              }
            },
            'error-callback': () => {
              if (!settled) {
                settled = true;
                clearTimeout(timeoutId);
                if (executeTimerId !== undefined)
                  clearTimeout(executeTimerId);
                reject(
                  new CaptchaError(
                    'CAPTCHA verification failed'
                  )
                );
              }
            },
          });
        } catch (err) {
          if (!settled) {
            settled = true;
            clearTimeout(timeoutId);
            reject(err);
          }
          return;
        }

        executeTimerId = setTimeout(() => {
          window.smartCaptcha?.execute(widgetId);
        }, 500);
      });
    } finally {
      container.remove();
      document
        .querySelectorAll(
          '[class*="smartcaptcha"], .smartcaptcha-popup'
        )
        .forEach((el) => el.remove());
      try {
        window.smartCaptcha?.reset?.(widgetId);
      } catch (e) {
        console.warn('[captcha] reset failed:', e);
      }
    }
  },
};
