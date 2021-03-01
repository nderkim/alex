const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const dev = process.env.NODE_ENV === "development";

module.exports = {
  mode: process.env.NODE_ENV,
  // entry: "./src", // default
  output: {
    path: path.resolve(dev ? "./build" : "./dist"),
    // filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: ["ts-loader"],
        exclude: /node_modules/,
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
    new HtmlWebpackPlugin(), // create index.html,
    // new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: false,
    // host: "0.0.0.0", // default: "localhost"
  },
  devtool: "eval-source-map", // recommended
};
