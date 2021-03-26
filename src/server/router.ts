import type { IncomingMessage, ServerResponse } from "http";

export default (req: IncomingMessage, res: ServerResponse): void => {
  const { method, url } = req;

  if (url === "/hello" && method === "GET") {
    res.end("Hello, world!");
  }
};
