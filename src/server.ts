import http from "http";

import HttpServer from "./lib/http-server";
import RequestListener from "./lib/static-middleware";

export default async (config: {
  dirPath: string;
  host?: string;
  port?: number;
}): Promise<http.Server> => {
  const { dirPath, host, port } = config;

  const requestListener = RequestListener(dirPath);
  const server = await HttpServer(requestListener, { host, port });

  return server;
};
