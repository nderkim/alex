const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const dev = process.env.NODE_ENV === "development";

module.exports = {
  mode: process.env.NODE_ENV,
  // entry: "./src", // default
  output: {
    path: path.resolve(dev ? "./build" : "./dist"),
    // filename: "[name].js", // main.js // default
    // publicPath: "/assets/",
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
    extensions: [".ts", "js"],
  },
  plugins: [
    new CleanWebpackPlugin(), // clean output dir
    // new CopyPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  target: "node",
};
