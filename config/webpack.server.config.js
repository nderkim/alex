const path = require("path");

const { HotModuleReplacementPlugin } = require("webpack");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  target: "node",
  mode: process.env.NODE_ENV,
  entry: isDev ? "./src/server/server" : "./src/server",
  output: {
    path: path.resolve(isDev ? "./build" : "./dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    isDev && new HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
};
