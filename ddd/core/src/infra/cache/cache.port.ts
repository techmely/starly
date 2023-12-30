export interface BaseCachePort {
  key: string;
  namespace: string;
  tier: string | string[];
}

export type CacheOptions = {
  /**
   * How long an entry should be fresh in milliseconds
   */
  fresh: number;
  /**
   * How long an entry should be stale in milliseconds
   *
   * Stale entries are still valid but should be refreshed in the background
   */
  stale: number;
};

export type CacheEntry<TValue> = {
  value: TValue;

  // Before this time the entry is considered fresh and valid
  freshUntil: number;

  staleUntil: number;
};

export interface CachePort<Namespaces extends Record<string, unknown>> {
  /**
   * Return the cached value
   *
   * The response will be `undefined` for cache misses or `null` when the key was not found in the origin
   *
   * The second value is true if the entry is stale and should be re-fetched from the origin
   */
  get: <TName extends keyof Namespaces>(
    namespace: TName,
    key: string,
  ) => [Namespaces[TName] | undefined, boolean] | Promise<[Namespaces[TName] | undefined, boolean]>;

  set: <TName extends keyof Namespaces>(
    namespace: keyof Namespaces,
    key: string,
    value: Namespaces[TName],
  ) => void;

  remove: (namespace: keyof Namespaces, key: string) => void;
}
