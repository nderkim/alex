/* eslint-disable @typescript-eslint/no-var-requires */

import type { IncomingMessage, ServerResponse } from "http";

type Cors = (req: IncomingMessage, res: ServerResponse) => void;
type Router = (req: IncomingMessage, res: ServerResponse) => void;

if (module.hot) {
  module.hot.accept("./cors");
  module.hot.accept("./router");
}

export const cors = module.hot
  ? (((...args) =>
      require<{ default: Cors }>("./cors").default(...args)) as Cors)
  : require<{ default: Cors }>("./cors").default;

export const router = module.hot
  ? (((...args) =>
      require<{ default: Router }>("./router").default(...args)) as Router)
  : require<{ default: Router }>("./router").default;
