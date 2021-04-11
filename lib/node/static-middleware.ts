import fs from "fs";
import path from "path";

import { pipe } from "../common/stream";

import type { IncomingMessage, ServerResponse } from "http";

export default (dirPath: string) => async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  const { url, method } = req;

  if (!url || method !== "GET") return;

  const filePath = path.join(dirPath, url === "/" ? "index.html" : url);
  const fileStream = fs.createReadStream(filePath);

  try {
    await pipe(fileStream, res);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return; // No such file or directory

    res.statusCode = 500; // Internal Server Error
    // res.statusMessage = http.STATUS_CODES[res.statusCode]; // If this is left as undefined then the standard message for the status code will be used.
    res.end();
  }
};
