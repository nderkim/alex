/* eslint-disable @typescript-eslint/no-var-requires */

import http from "http";

type Router = (req: http.IncomingMessage, res: http.ServerResponse) => void;

if (module.hot) {
  module.hot.accept("./router");
}

export const router = module.hot
  ? (((...args) =>
      require<{ default: Router }>("./router").default(...args)) as Router)
  : require<{ default: Router }>("./router").default;
