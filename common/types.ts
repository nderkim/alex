export type Maybe<T> = T | undefined;
export type Awaitable<T> = Promise<T> | T;

// void async function (fire and forget)
export const voidify = <T extends unknown[]>(
  fn: (...args: T) => Promise<void>
) => (...args: T): void => void fn(...args);
