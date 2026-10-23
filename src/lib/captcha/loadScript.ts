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

/** Test seam: pre-mark a url as loaded so getToken() does not wait on a real <script>. */
export function __markScriptLoaded(url: string): void {
  loaded.set(url, Promise.resolve());
}

export function __resetScriptCacheForTests(): void {
  loaded.clear();
}
