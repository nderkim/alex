import http from "http";
import net from "net";

export type UpgradeListener = (
  request: http.IncomingMessage,
  socket: net.Socket,
  head: Buffer
) => void;

export default async (
  opts: {
    host?: string;
    port?: number;
  } | null,
  requestListener?: http.RequestListener,
  upgradeListener?: UpgradeListener
): Promise<http.Server> => {
  const {
    host = "localhost",
    port, // If port is omitted or is 0, the operating system will assign an arbitrary unused port, which can be retrieved by using server.address().port after the 'listening' event has been emitted.
  } = opts ?? {};

  const server = http.createServer(requestListener);

  if (upgradeListener) server.on("upgrade", upgradeListener);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen({ port, host }, resolve);
  });

  return server;
};
