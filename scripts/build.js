process.env.NODE_ENV = "production";

const path = require("path");

const pkg = require("pkg");
const webpack = require("webpack");

const serverConfigPath = path.resolve("./config/webpack.server.config"); // relative to cwd
const clientConfigPath = path.resolve("./config/webpack.client.config"); // relative to cwd

const serverConfig = require(serverConfigPath);
const clientConfig = require(clientConfigPath);

const pkgConfig = {
  name: "alex",
  entry: "./dist/index.js", // relative to cwd
  configPath: "./config/pkg.config.js", // relative to cwd
  outDirPath: "./dist", // relative to cwd
};

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(clientConfig);

const compile = (compiler) =>
  new Promise((resolve, reject) =>
    compiler.run((err, stats) => (err ? reject(err) : resolve(stats)))
  ).then((stats) =>
    console.log(
      stats.toString({
        colors: true,
      })
    )
  );

(async () => {
  await Promise.all([compile(serverCompiler), compile(clientCompiler)]);

  const { name, entry, configPath, outDirPath } = pkgConfig;

  await pkg.exec([
    "--config",
    configPath,
    "--output",
    path.join(outDirPath, name),
    entry,
  ]);
})();
