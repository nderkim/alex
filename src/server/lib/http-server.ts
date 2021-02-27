import http from "http";

export default async (
  requestListener: http.RequestListener,
  opts?: {
    host?: string;
    port?: number;
  }
): Promise<http.Server> => {
  const {
    host = "localhost",
    port, // If port is omitted or is 0, the operating system will assign an arbitrary unused port, which can be retrieved by using server.address().port after the 'listening' event has been emitted.
  } = opts ?? {};

  const server = http.createServer(requestListener);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen({ port, host }, resolve);
  });

  return server;
};
