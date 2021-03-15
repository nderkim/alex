const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: [isDev && "webpack-hot-middleware/client", "./src/client"].filter(
      Boolean
    ),
  },
  output: {
    path: path.resolve(isDev ? "./build/client" : "./dist"),
    // filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(css|scss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i, // images
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // fonts
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(), // clean output dir
    // new CopyPlugin(),
    new HtmlWebpackPlugin({ template: "src/client/index.ejs" }), // create index.html,
    // new MiniCssExtractPlugin(),
    isDev && new HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  devServer: {
    contentBase: false,
    // host: "0.0.0.0", // default: "localhost"
  },
  devtool: isDev && "eval-source-map", // recommended
};
