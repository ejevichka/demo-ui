import { CaptchaError } from './types';
import type { CaptchaAdapter, CaptchaProviderId, CaptchaConfig } from './types';
import { recaptchaAdapter } from './recaptcha';

export { CaptchaError } from './types';
export type { CaptchaProviderId, CaptchaConfig, CaptchaAdapter } from './types';
export { __markScriptLoaded, __resetScriptCacheForTests } from './loadScript';
export { recaptchaScriptUrl } from './recaptcha';

const adapters: Partial<Record<CaptchaProviderId, CaptchaAdapter>> = {
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
/** Successful answers expire so a site-key rotation is picked up without a reload. */
const CONFIG_TTL_MS = 5 * 60_000;
const BACKOFF_MS = [300, 900];
const LAST_GOOD_PREFIX = 'captcha:last-good:';

interface CacheEntry {
  config: CaptchaConfig;
  expiresAt: number;
}

// Keyed by API base rather than one shared slot: this app drives three brand
// backends from a single bundle, and nothing says they must carry the same
// reCAPTCHA key. One slot would hand the second brand whatever the first one
// resolved.
const cache = new Map<string, CacheEntry>();

// A second map for calls already in the air. Without it two components asking
// at once fire two probes, and the slower answer overwrites the faster one -
// so a 503 arriving late could replace a good config for the rest of the
// session.
const inFlight = new Map<string, Promise<CaptchaConfig>>();

function isUsableKey(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function readLastGood(apiUrl: string): CaptchaConfig | null {
  try {
    const raw = localStorage.getItem(LAST_GOOD_PREFIX + apiUrl);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CaptchaConfig>;
    if (parsed.provider === 'google' && isUsableKey(parsed.siteKey)) {
      return { provider: 'google', siteKey: parsed.siteKey };
    }
    if (parsed.provider === 'none') {
      return { provider: 'none', siteKey: '' };
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
  | { kind: 'retry'; reason: string }
  | { kind: 'fatal'; reason: string };

/**
 * Validate one answer.
 *
 * There is no build-time key and no second provider to fall back to: the demo
 * runs reCAPTCHA, and the site key only ever comes from the backend. Anything
 * else the server might say - `yandex` left over from before the migration, a
 * provider with no key - is a backend misconfiguration, and saying so is more
 * useful than minting a token that will be refused somewhere else.
 */
function validate(data: Partial<CaptchaConfig>): Attempt {
  if (data.provider === 'none') {
    return { kind: 'ok', config: { provider: 'none', siteKey: '' } };
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

  return {
    kind: 'retry',
    reason: `backend reports provider "${String(
      data.provider
    )}", but this app only serves reCAPTCHA (set CAPTCHA_PROVIDER=google)`,
  };
}

async function probe(apiUrl: string): Promise<Attempt> {
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

  // A 404 is settled, not transient: this backend does not expose the endpoint
  // at all, so the key it verifies with is unknowable from here and retrying
  // cannot change that.
  if (res.status === 404) {
    return {
      kind: 'fatal',
      reason: `${apiUrl}/auth/captcha/config does not exist on this backend`,
    };
  }
  if (!res.ok) return { kind: 'retry', reason: `HTTP ${res.status}` };

  try {
    // Brand backends may return either the canonical flat shape or a
    // Genkit-flow envelope `{result: {...}}`. Unwrap one level so both
    // shapes hit the same validation; deeper nesting is a backend bug.
    const raw = (await res.json()) as Partial<CaptchaConfig> & {
      result?: Partial<CaptchaConfig>;
    };
    return validate(raw.result ?? raw);
  } catch {
    return { kind: 'retry', reason: 'response body is not valid JSON' };
  }
}

async function resolve(apiUrl: string): Promise<CaptchaConfig> {
  let lastReason = 'unknown';

  for (let attempt = 0; attempt <= BACKOFF_MS.length; attempt++) {
    const outcome = await probe(apiUrl);

    if (outcome.kind === 'ok') {
      cache.set(apiUrl, {
        config: outcome.config,
        expiresAt: Date.now() + CONFIG_TTL_MS,
      });
      writeLastGood(apiUrl, outcome.config);
      return outcome.config;
    }

    if (outcome.kind === 'fatal') {
      throw new CaptchaError(outcome.reason);
    }

    lastReason = outcome.reason;
    const backoff = BACKOFF_MS[attempt];
    if (backoff !== undefined) {
      await new Promise((r) => setTimeout(r, backoff));
    }
  }

  // Out of attempts. The key this backend last handed out is a far better
  // answer than refusing outright, and it is deliberately not written back to
  // the cache, so the next call probes again instead of living on a memory.
  const remembered = readLastGood(apiUrl);
  if (remembered) {
    console.warn(
      '[captcha] config unavailable (%s); using the last key this backend handed out',
      lastReason
    );
    return remembered;
  }

  throw new CaptchaError(
    `captcha configuration unavailable for ${apiUrl}: ${lastReason}`
  );
}

export async function resolveCaptchaConfig(
  apiUrl: string
): Promise<CaptchaConfig> {
  const hit = cache.get(apiUrl);
  if (hit && hit.expiresAt > Date.now()) return hit.config;

  const pending = inFlight.get(apiUrl);
  if (pending) return pending;

  const request = resolve(apiUrl).finally(() => {
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
