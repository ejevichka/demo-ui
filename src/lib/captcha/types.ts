export type CaptchaProviderId = 'google' | 'yandex' | 'none';

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
