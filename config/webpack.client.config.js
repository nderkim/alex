module.exports = {
  ...require("./webpack.browser.config"),
  entry: "./src/client",
  devServer: {
    port: 9000,
    open: true,
    // hot: true
  },
};
