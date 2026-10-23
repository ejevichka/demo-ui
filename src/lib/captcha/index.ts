import { CaptchaError } from './types';
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
    throw new CaptchaError(
      `No captcha adapter registered for provider: ${provider}`
    );
  }
  return adapter.getToken(siteKey);
}

const CONFIG_TIMEOUT_MS = 10_000;
/** Successful answers expire so a provider switch is picked up without a reload. */
const CONFIG_TTL_MS = 5 * 60_000;
const BACKOFF_MS = [300, 900];
const LAST_GOOD_PREFIX = 'captcha:last-good:';

interface CacheEntry {
  config: CaptchaConfig;
  /** Infinity for the legacy answer, which cannot change without a deploy. */
  expiresAt: number;
}

// Keyed by API base rather than one shared slot: this app drives three brand
// backends from a single bundle, and they can sit on different providers while
// a migration is half-done. One slot would hand the second brand the provider
// and site key of whichever brand the visitor happened to open first.
const cache = new Map<string, CacheEntry>();

// A second map for calls already in the air. Without it two components asking
// at once fire two probes, and the slower answer overwrites the faster one -
// so a 503 arriving late could replace a good Google config for the rest of
// the session.
const inFlight = new Map<string, Promise<CaptchaConfig>>();

function isUsableKey(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function readLastGood(apiUrl: string): CaptchaConfig | null {
  try {
    const raw = localStorage.getItem(LAST_GOOD_PREFIX + apiUrl);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CaptchaConfig>;
    if (
      parsed.provider === 'google' ||
      parsed.provider === 'yandex' ||
      parsed.provider === 'none'
    ) {
      return { provider: parsed.provider, siteKey: parsed.siteKey ?? '' };
    }
    return null;
  } catch {
    return null;
  }
}

function writeLastGood(apiUrl: string, config: CaptchaConfig): void {
  try {
    localStorage.setItem(LAST_GOOD_PREFIX + apiUrl, JSON.stringify(config));
  } catch {
    // Private mode or a full quota. Remembering is an optimisation, not a
    // requirement - the probe still runs on the next call.
  }
}

type Attempt =
  | { kind: 'ok'; config: CaptchaConfig }
  | { kind: 'legacy' }
  | { kind: 'retry'; reason: string };

/**
 * Validate one answer.
 *
 * The site key is provider-specific, which the first version missed: it applied
 * the build-time key to whatever the server named. That key is a Yandex client
 * key, so a Google answer that arrived without one got a Yandex key handed to
 * `grecaptcha.execute` - a guaranteed failure reported in Google's words rather
 * than ours. A Google key can only come from the server.
 */
function validate(
  data: Partial<CaptchaConfig>,
  fallbackSiteKey: string
): Attempt {
  if (data.provider === 'none') {
    return { kind: 'ok', config: { provider: 'none', siteKey: '' } };
  }

  if (data.provider === 'yandex') {
    const siteKey = isUsableKey(data.siteKey) ? data.siteKey : fallbackSiteKey;
    return isUsableKey(siteKey)
      ? { kind: 'ok', config: { provider: 'yandex', siteKey } }
      : { kind: 'retry', reason: 'yandex config carries no usable site key' };
  }

  if (data.provider === 'google') {
    return isUsableKey(data.siteKey)
      ? { kind: 'ok', config: { provider: 'google', siteKey: data.siteKey } }
      : {
          kind: 'retry',
          reason:
            'google config carries no site key (GOOGLE_RECAPTCHA_SITE_KEY unset on the backend)',
        };
  }

  return { kind: 'retry', reason: `unknown provider: ${String(data.provider)}` };
}

async function probe(
  apiUrl: string,
  fallbackSiteKey: string
): Promise<Attempt> {
  let res: Response;
  try {
    res = await fetch(`${apiUrl}/auth/captcha/config`, {
      signal: AbortSignal.timeout(CONFIG_TIMEOUT_MS),
    });
  } catch (err) {
    return {
      kind: 'retry',
      reason: err instanceof Error ? err.message : 'network failure',
    };
  }

  // 404 is the one definite answer a failure can carry: this backend predates
  // the endpoint, so it verifies with the provider that existed then. Every
  // other status is a server having a bad moment and says nothing about which
  // provider it verifies with.
  if (res.status === 404) return { kind: 'legacy' };
  if (!res.ok) return { kind: 'retry', reason: `HTTP ${res.status}` };

  try {
    // Brand backends may return either the canonical flat shape or a
    // Genkit-flow envelope `{result: {...}}`. Unwrap one level so both
    // shapes hit the same validation; deeper nesting is a backend bug.
    const raw = (await res.json()) as Partial<CaptchaConfig> & {
      result?: Partial<CaptchaConfig>;
    };
    return validate(raw.result ?? raw, fallbackSiteKey);
  } catch {
    return { kind: 'retry', reason: 'response body is not valid JSON' };
  }
}

async function resolve(
  apiUrl: string,
  fallbackSiteKey: string
): Promise<CaptchaConfig> {
  let lastReason = 'unknown';

  for (let attempt = 0; attempt <= BACKOFF_MS.length; attempt++) {
    const outcome = await probe(apiUrl, fallbackSiteKey);

    if (outcome.kind === 'ok') {
      cache.set(apiUrl, {
        config: outcome.config,
        expiresAt: Date.now() + CONFIG_TTL_MS,
      });
      writeLastGood(apiUrl, outcome.config);
      return outcome.config;
    }

    if (outcome.kind === 'legacy') {
      if (!isUsableKey(fallbackSiteKey)) {
        throw new CaptchaError(
          'captcha config endpoint is absent and no build-time site key is set'
        );
      }
      const legacy: CaptchaConfig = {
        provider: 'yandex',
        siteKey: fallbackSiteKey,
      };
      cache.set(apiUrl, { config: legacy, expiresAt: Infinity });
      return legacy;
    }

    lastReason = outcome.reason;
    const backoff = BACKOFF_MS[attempt];
    if (backoff !== undefined) {
      await new Promise((r) => setTimeout(r, backoff));
    }
  }

  // Out of attempts. What we must NOT do is quietly fall back to the build-time
  // Yandex key: once a backend has moved to reCAPTCHA, that mints a token the
  // server rejects, and a brief config outage turns into a sign-in failure
  // nobody can read. A provider we actually saw this backend use is a far
  // better guess, and it is deliberately not written back to the cache, so the
  // next call probes again instead of living on a memory.
  const remembered = readLastGood(apiUrl);
  if (remembered) {
    console.warn(
      '[captcha] config unavailable (%s); using the last provider this backend reported: %s',
      lastReason,
      remembered.provider
    );
    return remembered;
  }

  throw new CaptchaError(
    `captcha configuration unavailable for ${apiUrl}: ${lastReason}`
  );
}

export async function resolveCaptchaConfig(
  apiUrl: string,
  fallbackSiteKey: string
): Promise<CaptchaConfig> {
  const hit = cache.get(apiUrl);
  if (hit && hit.expiresAt > Date.now()) return hit.config;

  const pending = inFlight.get(apiUrl);
  if (pending) return pending;

  const request = resolve(apiUrl, fallbackSiteKey).finally(() => {
    inFlight.delete(apiUrl);
  });
  inFlight.set(apiUrl, request);

  return request;
}

/**
 * The resolved provider, derived from the cached config so it can never drift
 * from what resolveCaptchaConfig committed. Null until a stable outcome is
 * cached; a failure answered from the remembered config stays null, because
 * nothing was committed.
 */
export function getActiveProvider(apiUrl: string): CaptchaProviderId | null {
  const hit = cache.get(apiUrl);
  return hit && hit.expiresAt > Date.now() ? hit.config.provider : null;
}

export function __resetCaptchaConfigCache(): void {
  cache.clear();
  inFlight.clear();
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(LAST_GOOD_PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // Nothing to clear if storage is unavailable.
  }
}
