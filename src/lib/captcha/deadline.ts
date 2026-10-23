import { CaptchaError } from './types';

/**
 * Run `work` under ONE wall-clock budget that covers every await inside it.
 *
 * Both adapters used to time only their final `execute()` call, leaving the two
 * steps before it - fetching the vendor SDK and waiting for it to announce
 * itself - unbounded. A CDN request that hangs, or a `ready` callback that
 * never fires, left the promise pending forever and the sign-in button spinning
 * with nothing to report.
 *
 * `onTimeout` runs when the budget expires and is the place to drop whatever
 * cached state would make the retry hang the same way (see evictScript).
 */
export async function withDeadline<T>(
  ms: number,
  message: string,
  work: () => Promise<T>,
  onTimeout?: () => void
): Promise<T> {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  const expiry = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      try {
        onTimeout?.();
      } catch (err) {
        console.warn('[captcha] timeout cleanup failed:', err);
      }
      reject(new CaptchaError(message));
    }, ms);
  });

  try {
    // The loser of the race keeps running; that is why onTimeout drops its
    // cached handle rather than trying to cancel it.
    return await Promise.race([work(), expiry]);
  } finally {
    if (timerId !== undefined) clearTimeout(timerId);
  }
}
