import { Awaitable } from "./type-helpers";

export default <T extends unknown[]>(
  middlewares: ((...args: T) => Awaitable<unknown>)[],
  opts?: {
    shouldBreak?: (...args: T) => boolean;
  }
) => async (...args: T): Promise<void> => {
  for (const middleware of middlewares) {
    await middleware(...args);
    if (opts?.shouldBreak?.(...args)) break;
  }
};
