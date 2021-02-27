import http from "http";

export default (req: http.IncomingMessage, res: http.ServerResponse): void => {
  const t0 = Date.now();
  const { method, url } = req;
  res.once("finish", () => console.log(method, url, `${Date.now() - t0}ms`));
};
