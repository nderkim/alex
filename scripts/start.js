const EventEmitter = require("events");
const path = require("path");

const webpack = require("webpack");

// relative to cwd
const serverConfigPath = path.resolve("./config/webpack.server.config");
const clientConfigPath = path.resolve("./config/webpack.client.config");

const serverConfig = require(serverConfigPath);
const clientConfig = require(clientConfigPath);

const { watchOptions: serverWatchOptions } = serverConfig;
const { watchOptions: clientWatchOptions } = clientConfig;

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(clientConfig);

const ee = new EventEmitter();

const functionIterator = (iterator) => (...args) =>
  iterator.next().value(...args);

const serverInit = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      colors: true,
    })
  );

  const Server = require(stats.toJson().outputPath).default;
  Server(ee);
};

const serverCompileListener = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      colors: true,
    })
  );

  ee.emit("server");
};

serverCompiler.watch(
  serverWatchOptions,
  functionIterator(
    (function* () {
      yield serverInit;
      while (true) yield serverCompileListener;
    })()
  )
);

const clientCompileListener = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      colors: true,
    })
  );

  ee.emit("client");
};

clientCompiler.watch(clientWatchOptions, clientCompileListener);
