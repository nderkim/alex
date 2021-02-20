const fs = require("fs");
const path = require("path");

const sendStatus = (res, statusCode) => {
  res.statusCode = statusCode;
  // res.statusMessage = http.STATUS_CODES[statusCode]; // If this is left as undefined then the standard message for the status code will be used.
  res.end();
};

module.exports = (dirPath) => (req, res) => {
  const { method, url } = req;

  if (method !== "GET") return sendStatus(res, 405); // Method Not Allowed

  const filePath = path.join(dirPath, url === "/" ? "index.html" : url);
  const fileStream = fs.createReadStream(filePath);

  fileStream.on("error", (err) => {
    switch (err.code) {
      default:
        return sendStatus(res, 500); //Internal Server Error
      case "ENOENT":
        return sendStatus(res, 404); // Not Found
    }
  });

  fileStream.pipe(res);
};
