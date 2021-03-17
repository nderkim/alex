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

let isInitialised;

const callback = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      colors: true,
    })
  );

  if (!isInitialised) {
    require(stats.toJson().outputPath).default([
      webpackDevMiddleware(clientCompiler),
      webpackHotMiddleware(clientCompiler),
    ]);

    isInitialised = true;
  }
};

serverCompiler.watch(watchOptions, callback);
