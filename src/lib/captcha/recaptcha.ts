import { CaptchaError, type CaptchaAdapter } from './types';
import { loadScriptOnce } from './loadScript';

export function recaptchaScriptUrl(siteKey: string): string {
  return `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
    siteKey
  )}`;
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        opts: { action: string }
      ) => Promise<string>;
    };
  }
}

const RECAPTCHA_TIMEOUT = 30_000;

function hideBadgeOnce(): void {
  if (document.querySelector('style[data-recaptcha-badge]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-recaptcha-badge', '');
  style.textContent = '.grecaptcha-badge { visibility: hidden; }';
  document.head.appendChild(style);
}

function whenReady(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new CaptchaError('reCAPTCHA not available after loading'));
      return;
    }
    window.grecaptcha.ready(() => resolve());
  });
}

export const recaptchaAdapter: CaptchaAdapter = {
  async getToken(siteKey: string): Promise<string> {
    hideBadgeOnce();
    await loadScriptOnce(recaptchaScriptUrl(siteKey));
    await whenReady();

    try {
      const token = await new Promise<string>((resolve, reject) => {
        const timerId = setTimeout(
          () =>
            reject(
              new CaptchaError(
                'reCAPTCHA timed out after 30 seconds'
              )
            ),
          RECAPTCHA_TIMEOUT
        );
        window
          .grecaptcha!.execute(siteKey, { action: 'create_user' })
          .then((t) => {
            clearTimeout(timerId);
            resolve(t);
          })
          .catch((e) => {
            clearTimeout(timerId);
            reject(e);
          });
      });
      if (!token)
        throw new CaptchaError('reCAPTCHA returned an empty token');
      return token;
    } catch (err) {
      if (err instanceof CaptchaError) throw err;
      const message = err instanceof Error ? err.message : String(err);
      throw new CaptchaError(`reCAPTCHA verification failed: ${message}`);
    }
  },
};
