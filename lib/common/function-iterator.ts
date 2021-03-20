type Fn<Args extends [], T> = (...args: Args) => T;

export default <Args extends [], T>(
  iterator: Iterator<Fn<Args, T>, Fn<Args, T>>
): Fn<Args, T> => (...args) => iterator.next().value(...args);
