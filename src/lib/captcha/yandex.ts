import { CaptchaError, type CaptchaAdapter } from './types';
import { loadScriptOnce, evictScript } from './loadScript';
import { withDeadline } from './deadline';

export const YANDEX_SCRIPT_URL =
  'https://smartcaptcha.yandexcloud.net/captcha.js';
const CAPTCHA_TIMEOUT = 30_000;
const EXECUTE_DELAY_MS = 500;

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

/**
 * A collision-proof container id.
 *
 * `Date.now()` was not: two widgets created in the same millisecond - which two
 * brand clients racing to sign in can easily do - produced the same id, and
 * `render()` then attached the second widget to the first one's element.
 */
function newContainerId(): string {
  const unique =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `captcha-${unique}`;
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

async function obtainToken(siteKey: string): Promise<string> {
  await ready();

  const containerId = newContainerId();
  const container = document.createElement('div');
  container.id = containerId;
  container.style.display = 'none';
  document.body.appendChild(container);

  let widgetId: number | undefined;
  let executeTimerId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await new Promise<string>((resolve, reject) => {
      let settled = false;

      const settle = (fn: () => void) => {
        if (settled) return;
        settled = true;
        fn();
      };

      try {
        widgetId = window.smartCaptcha!.render(containerId, {
          sitekey: siteKey,
          invisible: true,
          callback: (token: string) =>
            settle(() =>
              token
                ? resolve(token)
                : reject(
                    new CaptchaError('SmartCaptcha returned an empty token')
                  )
            ),
          'error-callback': () =>
            settle(() =>
              reject(new CaptchaError('CAPTCHA verification failed'))
            ),
        });
      } catch (err) {
        settle(() => reject(err));
        return;
      }

      executeTimerId = setTimeout(() => {
        window.smartCaptcha?.execute(widgetId);
      }, EXECUTE_DELAY_MS);
    });
  } finally {
    if (executeTimerId !== undefined) clearTimeout(executeTimerId);
    container.remove();
    // Only this widget's own state is touched. The previous cleanup swept the
    // whole document for `[class*="smartcaptcha"]`, which on two overlapping
    // requests tore the other widget's DOM out from under it.
    try {
      window.smartCaptcha?.reset?.(widgetId);
    } catch (e) {
      console.warn('[captcha] reset failed:', e);
    }
  }
}

/**
 * Token requests are serialised.
 *
 * The invisible widget drives a single shared overlay, and nothing upstream
 * guarantees one sign-in at a time: the three brand clients each call
 * createUser() independently. Overlapping renders are the condition every DOM
 * problem in this adapter needed, so the queue removes the condition rather
 * than defending against it in five places.
 */
let queue: Promise<unknown> = Promise.resolve();

export const yandexAdapter: CaptchaAdapter = {
  getToken(siteKey: string): Promise<string> {
    const run = () =>
      withDeadline(
        CAPTCHA_TIMEOUT,
        'CAPTCHA timed out after 30 seconds',
        () => obtainToken(siteKey),
        () => evictScript(YANDEX_SCRIPT_URL)
      );

    const result = queue.then(run, run);
    // The queue must not inherit this call's rejection, or one failure would
    // reject every request behind it.
    queue = result.then(
      () => undefined,
      () => undefined
    );

    return result;
  },
};
