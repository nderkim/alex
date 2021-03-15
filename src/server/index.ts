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

import http from "http";
import { AddressInfo } from "net";

import express from "express";

import voidify from "../common/voidify";

import getAddress from "../node/address";
import open from "../node/open";

import { router } from "./hmr";
// import router from "./router";

export default (middlewares: express.RequestHandler[]): void => {
  const app = express();

  app.use(router);
  middlewares.forEach((middleware) => app.use(middleware));

  const server = http.createServer(app);

  server.listen(
    3000,
    voidify(async () => {
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
    })
  );
};
