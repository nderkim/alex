// TODO

if (module.hot) {
  const check = async (autoApply = true) => {
    const outdatedModules = await module.hot.check(autoApply);
    if (outdatedModules) console.log("[HMR] updated", outdatedModules);
  };

  module.hot.accept("./router");

  module.exports = {
    check,
    router: (...args) => require("./router").default(...args),
  };
} else {
  module.exports = {
    router: require("./router").default,
  };
}
