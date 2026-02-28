export function pick<T, K extends keyof T>(
  obj: T,
  realFilterData: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of realFilterData) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
