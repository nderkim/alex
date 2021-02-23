const { fork } = require("child_process");
const path = require("path");

const webpack = require("webpack");

const configPath = path.resolve("./webpack.config");
const config = require(configPath);
const { watchOptions } = config;

let childProcess;

function callback(err, stats) {
  if (err) throw err;

  console.log(
    stats.toString({
      colors: true,
    })
  );

  childProcess?.kill();
  childProcess = fork(path.join(stats.toJson().outputPath, "main.js"));
}

const compiler = webpack(config);
compiler.watch(watchOptions, callback);
