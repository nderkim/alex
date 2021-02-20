const path = require("path");

const address = require("./lib/address");
const open = require("./lib/open");

const Server = require("./src/server");

(async () => {
  const server = await Server({
    dirPath: path.join(__dirname, "public"),
    host: "0.0.0.0",
    port: 2539,
  });

  const { port } = server.address();

  console.log(
    `listening at:
- http://localhost:${port}
- http://${address()}:${port}
`
  );

  open(`http://localhost:${port}`);
})();
