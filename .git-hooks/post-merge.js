const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const console = require("../lib/common/console");

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

// TODO:
// - buffer compare
// - stream compare

(async () => {
  const filePath = path.resolve("./package.json"); // relative to cwd
  const hashPath = path.resolve("./package.json.hash"); // relative to cwd

  const expectedHash = await fs.promises.readFile(hashPath).catch((err) => {
    if (err.code === "ENOENT") return null;
    throw err;
  });

  if (!expectedHash) return console.error("Hash not found. Please run 'npm i'");

  const actualHash = await getFileHash(filePath);

  if (actualHash.toString() !== expectedHash.toString())
    console.warn("Your dependencies may have changed. Please run 'npm i'");
})();
