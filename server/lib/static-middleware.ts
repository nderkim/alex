import fs from "fs";
import http from "http";
import path from "path";

const sendStatus = (res: http.ServerResponse, statusCode: number) => {
  res.statusCode = statusCode;
  // res.statusMessage = http.STATUS_CODES[statusCode]; // If this is left as undefined then the standard message for the status code will be used.
  res.end();
};

export default (dirPath: string) => (
  req: http.IncomingMessage,
  res: http.ServerResponse
): void => {
  const { method, url } = req;

  if (method !== "GET") return sendStatus(res, 405); // Method Not Allowed
  if (url === undefined) return sendStatus(res, 400); // Bad Request

  const filePath = path.join(dirPath, url === "/" ? "index.html" : url);
  const fileStream = fs.createReadStream(filePath);

  fileStream.on("error", (err: NodeJS.ErrnoException) => {
    switch (err.code) {
      default:
        return sendStatus(res, 500); //Internal Server Error
      case "ENOENT":
        return sendStatus(res, 404); // Not Found
    }
  });

  fileStream.pipe(res);
};
