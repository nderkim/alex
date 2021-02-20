const HttpServer = require("../lib/http-server");
const RequestListener = require("../lib/static-middleware");

module.exports = async (config) => {
  const { dirPath, host, port } = config;

  const requestListener = RequestListener(dirPath);
  const server = await HttpServer(requestListener, { host, port });

  return server;
};
