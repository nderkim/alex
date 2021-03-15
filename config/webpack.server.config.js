const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: [isDev && "webpack/hot/poll?1000", "./src/server"].filter(Boolean),
  },
  output: {
    path: path.resolve(isDev ? "./build/server" : "./dist"),
    // filename: "[name].js", // main.js // default
    // publicPath: "/assets/",
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
    new CleanWebpackPlugin(), // clean output dir
    // new CopyPlugin(),
    isDev && new HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  target: "node",
};
