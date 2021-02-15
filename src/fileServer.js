const fs = require("fs");
const http = require("http");
const path = require("path");

const sendStatus = (res, statusCode) => {
  res.statusCode = statusCode;
  // res.statusMessage = http.STATUS_CODES[statusCode]; // If this is left as undefined then the standard message for the status code will be used.
  res.end();
};

const requestListener = (dirPath) => (req, res) => {
  const { method, url } = req;

  if (method !== "GET") return sendStatus(res, 405); // Method Not Allowed

  const filePath = path.join(dirPath, url === "/" ? "index.html" : url);
  const fileStream = fs.createReadStream(filePath);

  fileStream.on("error", (err) => {
    switch (err.code) {
      default:
        return sendStatus(res, 500); //Internal Server Error
      case "ENOENT":
        return sendStatus(res, 404); // Not Found
    }
  });

  fileStream.pipe(res);
};

module.exports = async (opts) => {
  const {
    dirPath, // required
    host = "localhost",
    port, // If port is omitted or is 0, the operating system will assign an arbitrary unused port, which can be retrieved by using server.address().port after the 'listening' event has been emitted.
  } = opts ?? {};

  const server = http.createServer(requestListener(dirPath));

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen({ port, host }, resolve);
  });

  return server;
};
