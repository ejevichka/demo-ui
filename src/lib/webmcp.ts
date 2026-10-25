/**
 * WebMCP on the demo stand: each store exposes its own brand's agent tools.
 *
 * The backend serves a registration script at `<api prefix>/webmcp/register.js`. It asks the `/mcp` endpoint beside
 * its own mount for the tool list and registers those tools with the browser's WebMCP API, so loading it from a
 * store's own API prefix is what makes that store's page expose that store's tools. Nothing brand-specific lives in
 * the script itself.
 *
 * Why the prefix and not one shared endpoint at the site root: all three stores share this origin and differ only by
 * path, while WebMCP registration belongs to a document. A single root endpoint could back only one of the three.
 *
 * Registration lasts for the life of the document — the script unregisters on `pagehide`, not on a client-side route
 * change — so switching stores has to be a real navigation. That is why `IndustrySelectPage` and `ThemeSwitcher` load
 * the next store instead of swapping the theme in place.
 */

import type { ThemeName } from '@/types';

/** API prefix per store, matching the Vercel rewrites and the three API clients. */
const API_PREFIX: Partial<Record<ThemeName, string>> = {
  brownmarket: '/krups-api',
  bluemarket: '/bluemarket-api',
  brainform: '/beauty-api',
};

/** Where this store's registration script lives, or null for a store with no backend (mock data only). */
export function webMcpScriptSrc(themeName: ThemeName): string | null {
  const prefix = API_PREFIX[themeName];
  return prefix ? `${prefix}/webmcp/register.js` : null;
}

/** This store's agent manifest, which agents look for before reading the page. */
export function agentManifestHref(themeName: ThemeName): string | null {
  const prefix = API_PREFIX[themeName];
  return prefix ? `${prefix}/.well-known/ard.json` : null;
}

/** Full page load, so the next store's document registers its own tools. */
export function openStore(themeName: ThemeName): void {
  window.location.assign(`/demo/${themeName}`);
}

/**
 * Leaving a store for the picker is a full page load for the same reason, in reverse: the
 * registration lives as long as the document, so a client-side route change would leave the
 * store's tools and its hidden agent notice on a page that shows no store at all — and a
 * back-forward-cache restore of that document would register them there again.
 */
export function openStorePicker(): void {
  window.location.assign('/select');
}
