const path = require("path");

const address = require("../lib/address");
const open = require("../lib/open");

const Server = require("./server");

const config = {
  dirPath: path.join(__dirname, "../public"),
  host: "0.0.0.0",
  port: 2539,
};

(async () => {
  const server = await Server(config);

  const { port } = server.address();

  console.log(
    `listening at:
- http://localhost:${port}
- http://${address()}:${port}
`
  );

  open(`http://localhost:${port}`);
})();
