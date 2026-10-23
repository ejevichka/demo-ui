import { describe, it, expect, afterEach } from 'vitest';
import { loadScriptOnce, __resetScriptCacheForTests } from './loadScript';

afterEach(() => {
  __resetScriptCacheForTests();
  document
    .querySelectorAll('script[data-captcha]')
    .forEach((el) => el.remove());
});

describe('loadScriptOnce', () => {
  it('injects a script once and returns the same promise for the same url', () => {
    const url = 'https://example.test/a.js?data-captcha';
    const p1 = loadScriptOnce(url);
    const p2 = loadScriptOnce(url);
    expect(p1).toBe(p2);
    expect(document.querySelectorAll(`script[src="${url}"]`).length).toBe(
      1
    );
  });
});
