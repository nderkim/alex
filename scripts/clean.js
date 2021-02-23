const fs = require("fs").promises;
const path = require("path");

const directories = ["node_modules", "dist", "build"];
const files = ["package-lock.json", "yarn.lock"];

async function cleanDirent(dirent, direntPath) {
  if (dirent.isDirectory()) {
    if (directories.includes(dirent.name)) {
      console.log("delete", direntPath);
      return fs.rm(direntPath, { recursive: true });
    } else {
      return cleanDir(direntPath);
    }
  } else if (dirent.isFile()) {
    if (files.includes(dirent.name)) {
      console.log("delete", direntPath);
      return fs.rm(direntPath);
    }
  }
}

async function cleanDir(dirPath) {
  const dirents = await fs.readdir(dirPath, { withFileTypes: true });
  return Promise.all(
    dirents.map((dirent) =>
      cleanDirent(dirent, path.join(dirPath, dirent.name))
    )
  );
}

const cwd = process.cwd();
console.log("cwd", cwd);
cleanDir(cwd);
