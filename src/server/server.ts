import { spawn } from "child_process";
import http from "http";

import Middleware from "../common/middleware";
import voidify from "../common/voidify";

import debugMiddleware from "../node/debug-middleware";
import HttpServer from "../node/http-server";
import StaticMiddleware from "../node/static-middleware";
import WsUpgradeListener from "../node/ws-upgrade-listener";

export default async (config: {
  dirPath: string;
  host?: string;
  port?: number;
}): Promise<http.Server> => {
  const { dirPath, host, port } = config;

  const server = await HttpServer(
    {
      host,
      port,
    },
    voidify(
      Middleware([debugMiddleware, StaticMiddleware(dirPath)], {
        shouldBreak: (_req, res) => res.writableEnded,
      })
    ),
    WsUpgradeListener((ws) => {
      const sh = spawn("/bin/sh");
      sh.stdout.on("data", (data: Buffer) => ws.send(data.toString()));
      sh.stderr.on("data", (data: Buffer) => ws.send(data.toString()));
      ws.onmessage = (e) => sh.stdin.write(e.data);
    })
  );

  return server;
};
