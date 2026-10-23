import type { CaptchaAdapter, CaptchaProviderId, CaptchaConfig } from './types';
import { yandexAdapter } from './yandex';
import { recaptchaAdapter } from './recaptcha';

export { CaptchaError } from './types';
export type { CaptchaProviderId, CaptchaConfig, CaptchaAdapter } from './types';
export { __markScriptLoaded, __resetScriptCacheForTests } from './loadScript';
export { YANDEX_SCRIPT_URL } from './yandex';
export { recaptchaScriptUrl } from './recaptcha';

const adapters: Partial<Record<CaptchaProviderId, CaptchaAdapter>> = {
  yandex: yandexAdapter,
  google: recaptchaAdapter,
};

/** Test/extension seam: register or override an adapter for a provider. */
export function registerAdapter(
  provider: CaptchaProviderId,
  adapter: CaptchaAdapter
): void {
  adapters[provider] = adapter;
}

export async function getCaptchaToken(
  provider: CaptchaProviderId,
  siteKey: string
): Promise<string> {
  if (provider === 'none') return 'none';
  const adapter = adapters[provider];
  if (!adapter) {
    throw new Error(
      `No captcha adapter registered for provider: ${provider}`
    );
  }
  return adapter.getToken(siteKey);
}

// Keyed by API base rather than one shared slot: this app drives three brand
// backends from a single bundle, and they can sit on different providers while
// a migration is half-done. One slot would hand the second brand the provider
// and site key of whichever brand the visitor happened to open first.
const cachedConfigs = new Map<string, CaptchaConfig>();

export async function resolveCaptchaConfig(
  apiUrl: string,
  fallbackSiteKey: string
): Promise<CaptchaConfig> {
  const cached = cachedConfigs.get(apiUrl);
  if (cached) return cached;

  const fallback: CaptchaConfig = {
    provider: 'yandex',
    siteKey: fallbackSiteKey,
  };
  try {
    const res = await fetch(`${apiUrl}/auth/captcha/config`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      cachedConfigs.set(apiUrl, fallback);
      return fallback;
    }
    // Brand backends may return either the canonical flat shape or a
    // Genkit-flow envelope `{result: {...}}`. Unwrap one level so both
    // shapes hit the same validation; deeper nesting is a backend bug.
    const raw = (await res.json()) as Partial<CaptchaConfig> & {
      result?: Partial<CaptchaConfig>;
    };
    const data: Partial<CaptchaConfig> = raw.result ?? raw;
    if (
      data.provider === 'google' ||
      data.provider === 'yandex' ||
      data.provider === 'none'
    ) {
      const config: CaptchaConfig = {
        provider: data.provider,
        siteKey: data.siteKey ?? fallbackSiteKey,
      };
      cachedConfigs.set(apiUrl, config);
      return config;
    }
    // Log the unknown-provider fallback so the next misshapen-payload
    // incident is debuggable from the browser console.
    console.warn(
      '[captcha] config: unknown provider, falling back to yandex:',
      data.provider
    );
    cachedConfigs.set(apiUrl, fallback);
    return fallback;
  } catch {
    // Transient probe failure (network/timeout): return safe fallback
    // WITHOUT caching, so the next call retries the server. Because the
    // fallback is uncached, getActiveProvider(apiUrl) stays null here rather
    // than falsely committing to 'yandex'.
    return fallback;
  }
}

/**
 * The resolved provider, derived from the cached config so it can never drift
 * from what resolveCaptchaConfig committed. Null until a stable outcome is
 * cached (success / 404 / invalid provider); transient failures stay null.
 */
export function getActiveProvider(apiUrl: string): CaptchaProviderId | null {
  return cachedConfigs.get(apiUrl)?.provider ?? null;
}

export function __resetCaptchaConfigCache(): void {
  cachedConfigs.clear();
}
