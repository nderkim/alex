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

import getAddress from "../../lib/node/address";
import httpServer from "../../lib/node/http-server";
import open from "../../lib/node/open";

import { router } from "./hmr";
// import router from "./router";

const config = {
  port: 3000,
};

export default async (
  middlewares?: express.RequestHandler[]
): Promise<Server> => {
  const app = express();

  app.use(router);

  if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "public")));
  }

  middlewares?.forEach((middleware) => app.use(middleware));

  const server = await httpServer(config, app);

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
