import type { LitElement } from "lit";

type UpdateHandler = (prev?: unknown, next?: unknown) => void;

type NonUndefined<A> = A extends undefined ? never : A;

type UpdateHandlerFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends UpdateHandler ? K : never;
}[keyof T];

type WatchOptions = {
  waitUtilFirstUpdate?: boolean;
};

/**
 * Runs when observed properties change, e.g. @property or @state, but before the component updates. To wait for an
 * update to complete after a change occurs, use `await this.updateComplete` in the handler. To start watching after the
 * initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
 *
 * Usage:
 *
 * @watch('propName')
 * handlePropChange(oldValue, newValue) {
 *   ...
 * }
 */
export function watch(propertyName: string | string[], options?: WatchOptions) {
  const defaultOptions: WatchOptions = { waitUtilFirstUpdate: false, ...options };

  return <ElementClass extends LitElement>(
    proto: ElementClass,
    decoratedFnName: UpdateHandlerFunctionKeys<ElementClass>,
  ) => {
    // @ts-expect-error Update is a protected property
    const originalUpdate = proto.update;
    // const { update } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];

    // @ts-expect-error Update is a protected property
    proto.updateWithWatch = function (
      this: ElementClass,
      changedProps: Map<keyof ElementClass, ElementClass[keyof ElementClass]>,
    ) {
      for (const prop of watchedProperties) {
        const key = prop as keyof ElementClass;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];
          if (oldValue !== newValue) {
            if (!defaultOptions.waitUtilFirstUpdate || this.hasUpdated) {
              (this[decoratedFnName] as unknown as UpdateHandler)(oldValue, newValue);
            }
          }
        }
      }

      originalUpdate.call(this, changedProps);
    };
  };
}
