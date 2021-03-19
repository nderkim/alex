const path = require("path");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

// relative to cwd
const serverConfigPath = path.resolve("./config/webpack.server.config");
const clientConfigPath = path.resolve("./config/webpack.client.config");

const serverConfig = require(serverConfigPath);
const clientConfig = require(clientConfigPath);

const { watchOptions } = serverConfig;

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(clientConfig);

let serverHmr;

const callback = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      colors: true,
    })
  );

  if (serverHmr) {
    serverHmr.check();
  } else {
    const { Server, hmr } = require(stats.toJson().outputPath);
    Server([
      webpackDevMiddleware(clientCompiler),
      webpackHotMiddleware(clientCompiler),
    ]);

    serverHmr = hmr;
  }
};

serverCompiler.watch(watchOptions, callback);
