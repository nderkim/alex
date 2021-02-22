import net from "net";
import path from "path";

import getAddress from "./lib/address";
import open from "./lib/open";

import Server from "./server";

const config = {
  dirPath: path.join(__dirname, "../public"),
  host: "0.0.0.0",
  port: 2539,
};

void (async () => {
  const server = await Server(config);

  const { port } = server.address() as net.AddressInfo; // HACK: assumes TCP (not IPC)

  console.log(
    `listening at:
- http://localhost:${port}`
  );

  const address = getAddress();
  if (address) {
    console.log(`- http://${address}:${port}`);
  }

  await open(`http://localhost:${port}`);
})();
