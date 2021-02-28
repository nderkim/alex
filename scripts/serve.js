const path = require("path");

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require(path.resolve("./config/webpack.client.config")); // relative to cwd
const { devServer } = config;
const { port, host } = devServer;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, devServer);
server.listen(port, host, (err) => {
  if (err) throw err;
});

// const reload = () => server.sockWrite(server.sockets, "ok"); // TODO
