export const getFulfilledValue = <T>(
  input: PromiseSettledResult<T>,
  defaultValue: Partial<T> = {} as T,
) => (input.status === "fulfilled" ? input.value : (defaultValue as T));
