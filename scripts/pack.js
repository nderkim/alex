const path = require("path");

const pkg = require("pkg");

const name = "alex";
const entry = "./server.js";
const configPath = "./pkg.config.js";
const outDirPath = "./bin";

pkg.exec([
  "--config",
  configPath,
  "--output",
  path.join(outDirPath, name),
  entry,
]);
