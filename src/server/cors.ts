// TODO

import type { IncomingMessage, ServerResponse } from "http";

const whitelist = ["http://localhost:3000", "https://nderkim.github.io"];

export default (req: IncomingMessage, res: ServerResponse): void => {
  const { headers } = req;

  const { origin } = headers;

  if (!origin) return;

  if (whitelist.includes(origin))
    return res.setHeader("Access-Control-Allow-Origin", origin);

  res.statusCode = 400; // Bad Request
  res.end();
};
