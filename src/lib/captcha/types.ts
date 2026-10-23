/**
 * The demo stand runs Google reCAPTCHA v3 only.
 *
 * `yandex` was removed deliberately rather than left as a dormant option: an
 * adapter nobody exercises rots, and a union that still admits a provider the
 * bundle cannot serve turns a backend misconfiguration into a silent wrong
 * token instead of a loud error. `none` stays because a backend may legitimately
 * run with the captcha switched off.
 */
export type CaptchaProviderId = 'google' | 'none';

export class CaptchaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CaptchaError';
  }
}

export interface CaptchaConfig {
  provider: CaptchaProviderId;
  siteKey: string;
}

export interface CaptchaAdapter {
  /** Idempotently loads its SDK, obtains a token, rejects with CaptchaError on fail/timeout. */
  getToken(siteKey: string): Promise<string>;
}
