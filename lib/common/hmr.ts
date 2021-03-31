export const check = async (autoApply = true): Promise<void> => {
  const outdatedModules = await module.hot?.check(autoApply);
  if (outdatedModules) console.log("[HMR] updated", outdatedModules);
};
