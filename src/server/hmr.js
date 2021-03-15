if (module.hot) {
  module.hot.accept("./router");

  module.exports = {
    router: (...args) => require("./router").default(...args),
  };
} else {
  // TODO
}
