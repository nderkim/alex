import { Awaitable, PubSub } from "../common/types";

const withRetries = <A extends unknown[], T>(
  fn: (...args: A) => Awaitable<T>,
  opts?: { retries?: number; delay?: number; minPeriod?: number }
) => {
  const { retries = Infinity, delay = 0, minPeriod = 0 } = opts ?? {};

  return async (...args: A) => {
    for (let i = 0; i < retries; i++) {
      const t0 = Date.now();
      try {
        return await fn(...args);
      } catch (err) {
        console.warn(`Attempt #${i + 1} failed with ${String(err)}`);
      }
      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(t0 + minPeriod - Date.now(), delay))
      );
    }
    throw new Error(`Failed after ${retries} attempts`);
  };
};

const withTimeout = <A extends unknown[], T>(
  fn: (...args: A) => Promise<T>,
  opts?: { ms?: number; destructor?: (value: T) => void }
) => {
  const { ms = 0, destructor } = opts ?? {};

  return async (...args: A) => {
    const promise = fn(...args);
    return Promise.race<Promise<T>>([
      promise,
      new Promise((_resolve, reject) =>
        setTimeout(() => reject(new Error("Timed out")), ms)
      ),
    ]).catch((err) => {
      void promise.then(destructor);
      throw err;
    });
  };
};

const createWebSocket = async (url: string) => {
  const ws = new WebSocket(url);
  await new Promise((resolve, reject) => {
    ws.onerror = () =>
      reject(new Error(`WebSocket connection to '${url}' failed`));
    ws.onopen = resolve;
  });
  return ws;
};

const tryCreateWebSocket = withRetries(
  withTimeout(createWebSocket, {
    ms: 60000,
    destructor: (ws) => ws.close(),
  }),
  { retries: Infinity, delay: 100, minPeriod: 100 }
);

export type ManagedWebSocket = {
  onconnected?: () => void;
  ondisconnected?: (e: CloseEvent) => void;
  onmessage?: (data: string) => void;
  send: (data: string) => void;
  close: (code?: number, reason?: string) => void;
};

const createManagedWebSocket = (url: string): ManagedWebSocket => {
  let wsPromise: Promise<WebSocket>;

  const onWebsocket = (ws: WebSocket) => {
    console.log("WebSocket", "connected");
    self.onconnected?.();

    ws.onclose = (e) => {
      console.log("WebSocket", "disconnected", e);
      self.ondisconnected?.(e);
      wsPromise = tryCreateWebSocket(url);
      void wsPromise.then(onWebsocket);
    };

    ws.onmessage = (e) => self.onmessage?.(e.data);
  };

  wsPromise = tryCreateWebSocket(url);
  void wsPromise.then(onWebsocket);

  const self: ManagedWebSocket = {
    send: (data) => wsPromise.then((ws) => ws.send(data)),
    close: (code, reason) => wsPromise.then((ws) => ws.close(code, reason)),
  };

  return self;
};

export default (url: string): PubSub<string> => {
  const ws = createManagedWebSocket(url);

  return {
    publish: (data: string) => ws.send(data),
    subscribe: (cb: (data: string) => void) => {
      ws.onmessage = cb;
      return () => {
        ws.onmessage = undefined;
      };
    },
  };
};
