import http from "http";

export default (req: http.IncomingMessage, res: http.ServerResponse): void => {
  const { method, url } = req;

  if (url === "/hello" && method === "GET") {
    res.end("Hello, world!");
  }
};
