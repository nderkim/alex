import { Server } from "http";
import { AddressInfo } from "net";
import path from "path";

import Middleware from "../../lib/common/middleware";
import { isTruthy, voidify } from "../../lib/common/type-helpers";

import getAddress from "../../lib/node/address";
import debugMiddleware from "../../lib/node/debug-middleware";
import httpServer from "../../lib/node/http-server";
import open from "../../lib/node/open";
import StaticMiddleware from "../../lib/node/static-middleware";
import wsUpgradeListener from "../../lib/node/ws-upgrade-listener";

import { cors, router } from "./hmr";

const check = async (autoApply = true) => {
  const outdatedModules = await module.hot?.check(autoApply);
  if (outdatedModules) console.log("[HMR] updated", outdatedModules);
};

const config = {
  host: "localhost",
  port: 3000,
  dirPath: path.join(__dirname, "public"),
};

export default async (compiler?: NodeJS.EventEmitter): Promise<Server> => {
  compiler?.on("server", voidify(check));

  const server = await httpServer(
    { host: config.host, port: config.port },
    voidify(
      Middleware(
        [
          process.env.NODE_ENV === "development" && debugMiddleware,
          cors,
          router,
          StaticMiddleware(config.dirPath),
        ].filter(isTruthy),
        {
          shouldBreak: (_req, res) => res.writableEnded,
        }
      )
    ),
    wsUpgradeListener((ws) => {
      const compileListener = () => ws.send("compile");
      compiler?.on("client", compileListener);
      ws.onclose = () => compiler?.off("client", compileListener);
    })
  );

  const { port } = server.address() as AddressInfo; // assume TCP (not IPC)

  console.log(
    `listening at:
- http://localhost:${port}`
  );

  const address = getAddress();
  if (address) {
    console.log(`- http://${address}:${port}`);
  }

  await open(`http://localhost:${port}`);

  return server;
};
