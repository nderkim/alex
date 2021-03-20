// import net from "net";
// import path from "path";

// import getAddress from "../node/address";
// import open from "../node/open";

// import Server from "./server";

// const config = {
//   dirPath: path.join(__dirname, "../public"),
//   host: "0.0.0.0",
//   port: 2539,
// };

// void (async () => {
//   const server = await Server(config);

//   const { port } = server.address() as net.AddressInfo; // HACK: assumes TCP (not IPC)

//   console.log(
//     `listening at:
// - http://localhost:${port}`
//   );

//   const address = getAddress();
//   if (address) {
//     console.log(`- http://${address}:${port}`);
//   }

//   await open(`http://localhost:${port}`);
// })();

import { Server } from "http";
import { AddressInfo } from "net";
import path from "path";

import express from "express";

import voidify from "../../lib/common/voidify";

import getAddress from "../../lib/node/address";
import httpServer from "../../lib/node/http-server";
import open from "../../lib/node/open";
import wsUpgradeListener from "../../lib/node/ws-upgrade-listener";

import { router } from "./hmr";

const check = async (autoApply = true) => {
  const outdatedModules = await module.hot?.check(autoApply);
  if (outdatedModules) console.log("[HMR] updated", outdatedModules);
};

const config = {
  port: 3000,
};

export default async (compiler?: NodeJS.EventEmitter): Promise<Server> => {
  compiler?.on("server", voidify(check));

  const app = express();

  app.use(router);

  app.use(express.static(path.join(__dirname, "public")));

  const server = await httpServer(
    config,
    app,
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
