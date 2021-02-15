const path = require("path");

const address = require("./src/address");
const open = require("./src/open");

const { createFileServer } = require(".");

const host = "0.0.0.0";
const port = 2539;
const dirPath = path.join(__dirname, "public");

(async () => {
  const fileServer = await createFileServer({
    dirPath,
    host,
    port,
  });

  // const { port } = fileServer.address();

  console.log(
    `listening at:
- http://localhost:${port}
- http://${address()}:${port}
`
  );

  open(`http://localhost:${port}`);
})();
