import http from "http";

import Middleware from "../common/middleware";
import { voidify } from "../common/types";

import debugMiddleware from "./lib/debug-middleware";
import HttpServer from "./lib/http-server";
import staticMiddleware from "./lib/static-middleware";

export default async (config: {
  dirPath: string;
  host?: string;
  port?: number;
}): Promise<http.Server> => {
  const { dirPath, host, port } = config;

  const server = await HttpServer(
    voidify(
      Middleware([debugMiddleware, staticMiddleware(dirPath)], {
        shouldBreak: (_req, res) => res.writableEnded,
      })
    ),
    {
      host,
      port,
    }
  );

  return server;
};
