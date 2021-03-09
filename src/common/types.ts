export type Maybe<T> = T | undefined;
export type Awaitable<T> = Promise<T> | T;

type Publish<T> = (data: T) => void;
type Callback<T> = (data: T) => void;
type Unsubscribe = () => void;
type Subscribe<T> = (cb: Callback<T>) => Unsubscribe;
export type PubSub<T> = {
  publish: Publish<T>;
  subscribe: Subscribe<T>;
};
