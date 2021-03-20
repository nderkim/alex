/* eslint-disable @typescript-eslint/no-var-requires */

import { Router } from "express";

export const router = module.hot
  ? (((...args) =>
      require<{ default: Router }>("./router").default(...args)) as Router)
  : require<{ default: Router }>("./router").default;

if (module.hot) {
  module.hot.accept("./router");
}
