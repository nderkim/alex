if (module.hot) {
  module.hot.accept("./router");

  module.exports = {
    router: function (...args) {
      return require("./router").default(...args);
    },
  };
}
