const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // entry: "./src", // default
  output: {
    path: path.resolve(__dirname, "dist"), // default
    // filename: "[name].js", // main.js // default
  },
  plugins: [
    new CleanWebpackPlugin(), // clean output dir
  ],
  target: "node",
};
