import { CaptchaError, type CaptchaAdapter } from './types';
import { loadScriptOnce, evictScript } from './loadScript';
import { withDeadline } from './deadline';

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

// The badge is deliberately NOT hidden. Google permits hiding it only when the
// page carries the reCAPTCHA notice with links to the Privacy Policy and Terms
// of Service (https://developers.google.com/recaptcha/docs/faq), and this app
// shows no such notice. Hiding it here would put the demo out of compliance
// with the terms of the key it runs on. If the notice is ever added to the
// sign-in flow, hiding the badge becomes legitimate - and that is a UI change,
// not a change to this adapter.

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
    const url = recaptchaScriptUrl(siteKey);

    return withDeadline(
      RECAPTCHA_TIMEOUT,
      'reCAPTCHA timed out after 30 seconds',
      async () => {
        await loadScriptOnce(url);
        await whenReady();

        try {
          const token = await window.grecaptcha!.execute(siteKey, {
            action: 'create_user',
          });
          if (!token)
            throw new CaptchaError('reCAPTCHA returned an empty token');
          return token;
        } catch (err) {
          if (err instanceof CaptchaError) throw err;
          const message = err instanceof Error ? err.message : String(err);
          throw new CaptchaError(
            `reCAPTCHA verification failed: ${message}`
          );
        }
      },
      () => evictScript(url)
    );
  },
};
