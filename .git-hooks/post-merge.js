const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const readStreamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

const getStreamHash = (stream) => {
  const hash = crypto.createHash("sha256");
  stream.pipe(hash);
  return readStreamToBuffer(hash);
};

const getFileHash = (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  return getStreamHash(fileStream);
};

(async () => {
  const filePath = path.resolve("./package.json"); // relative to cwd
  const hash = await getFileHash(filePath);
  console.log(hash);
})();
