process.env.NODE_ENV = "development";

const EventEmitter = require("events");
// const inspector = require("inspector");
const path = require("path");

// TODO
// inspector.open();
// console.log(inspector.url());

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

let serverCompilationHash;
let clientCompilationHash;

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

  const modulePath = stats.toJson().outputPath;
  const Server = require(modulePath).default;
  Server(ee);

  serverCompilationHash = stats.compilation.hash;
};

const serverCompileListener = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      colors: true,
    })
  );

  const hash = stats.compilation.hash;

  if (hash !== serverCompilationHash) ee.emit("server");
  serverCompilationHash = hash;
};

const clientCompileListener = (err, stats) => {
  if (err) throw err;

  console.log(
    stats.toString({
      colors: true,
    })
  );

  const hash = stats.compilation.hash;

  if (hash !== clientCompilationHash) ee.emit("client");
  clientCompilationHash = hash;
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

clientCompiler.watch(clientWatchOptions, clientCompileListener);
