const loaded = new Map<string, Promise<void>>();

export function loadScriptOnce(url: string): Promise<void> {
  const existing = loaded.get(url);
  if (existing) return existing;

  const p = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-captcha', '');
    script.onload = () => resolve();
    script.onerror = () => {
      loaded.delete(url);
      reject(new Error(`Failed to load captcha script: ${url}`));
    };
    document.head.appendChild(script);
  });
  loaded.set(url, p);
  return p;
}

/**
 * Forget a url so the next loadScriptOnce() starts a fresh <script>.
 *
 * A load that never settles - a hung CDN request, or a response that arrives
 * but never fires onload - leaves a pending promise cached forever, and every
 * later attempt awaits that same dead promise. onerror already evicts; a
 * timeout has no such hook, so the caller that gave up must evict explicitly
 * or its retry is guaranteed to hang too.
 */
export function evictScript(url: string): void {
  loaded.delete(url);
  document
    .querySelectorAll('script[data-captcha]')
    .forEach((el) => {
      if (el.getAttribute('src') === url) el.remove();
    });
}

/** Test seam: pre-mark a url as loaded so getToken() does not wait on a real <script>. */
export function __markScriptLoaded(url: string): void {
  loaded.set(url, Promise.resolve());
}

export function __resetScriptCacheForTests(): void {
  loaded.clear();
}
