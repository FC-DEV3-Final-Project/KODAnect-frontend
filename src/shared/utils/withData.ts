export const withData = <T>(promise: Promise<{ data: T }>): Promise<T> =>
  promise.then((res) => res.data);
