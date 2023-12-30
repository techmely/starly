/**
 * @description Listens for one event and resolves with this event object after it was fired.
 *
 * @example
 * setTimeout(() => el.fireDone());
 * await oneEvent(el, 'done');
 * expect(el.done).to.be.true;
 * @returns Promise to await until the event has been fired
 */
export function oneEvent(eventTarget: HTMLElement, eventName: string) {
  return new Promise((resolve) => {
    function listener(ev: Event) {
      resolve(ev);
      eventTarget.removeEventListener(eventName, listener);
    }
    eventTarget.addEventListener(eventName, listener);
  });
}

type WaitUtilOptions = {
  interval?: number;
  timeout?: number;
};

/**
 * Waits until the given predicate returns a truthy value. Calls and awaits the predicate
 * function at the given interval time. Can be used to poll until a certain condition is true.
 *
 * @example
 * ```js
 * import { fixture, waitUntil } from '@open-wc/testing-helpers';
 *
 * const element = await fixture(html`<my-element></my-element>`);
 *
 * await waitUntil(() => element.someAsyncProperty, 'element should become ready');
 * ```
 *
 */
export function waitUntil(
  predicate: () => unknown | Promise<unknown>,
  message: string,
  options: WaitUtilOptions = {},
) {
  const { interval = 50, timeout = 1000 } = options;

  return new Promise((resolve, reject) => {
    let timeoutId: NodeJS.Timeout;

    setTimeout(() => {
      clearTimeout(timeoutId);
      reject(new Error(message ? `Timeout: ${message}` : `waitUntil timed out after ${timeout}ms`));
    }, timeout);

    async function nextInterval() {
      try {
        if (await predicate()) {
          resolve(undefined);
        } else {
          timeoutId = setTimeout(() => {
            nextInterval();
          }, interval);
        }
      } catch (error) {
        reject(error);
      }
    }
    nextInterval();
  });
}
