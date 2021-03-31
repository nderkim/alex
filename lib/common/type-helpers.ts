export type Nullish = null | undefined;
export type Falsy = false | 0 | "" | Nullish;
export type Maybe<T> = T | Nullish;

export type Awaitable<T> = Promise<T> | T;

export const isTruthy = <T>(x: T | Falsy): x is T => Boolean(x);

type Publish<T> = (data: T) => void;
type Callback<T> = (data: T) => void;
type Unsubscribe = () => void;
type Subscribe<T> = (cb: Callback<T>) => Unsubscribe;
export type PubSub<T> = {
  publish: Publish<T>;
  subscribe: Subscribe<T>;
};

// void async function (fire and forget)
export const voidify = <Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  cb?: (err: Error | null, res?: Result) => void
) => (...args: Args): void =>
  void fn(...args).then(
    (res) => cb?.(null, res),
    (err) => cb?.(err)
  );
