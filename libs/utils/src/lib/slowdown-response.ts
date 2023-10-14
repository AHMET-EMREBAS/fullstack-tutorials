export function slowDownResponse<T = any>(data: T, duration = 400): Promise<T> {
  return new Promise((res, rej) => {
    setTimeout(() => res(data), duration);
  });
}
