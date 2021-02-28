const fs = require("fs").promises;
const path = require("path");

const ignoreDirectories = [".git"];
const directories = ["node_modules", "dist", "build"];
const files = [
  // "package-lock.json",
  // "yarn.lock",
];

async function cleanDirent(dirent, direntPath) {
  if (dirent.isDirectory()) {
    if (ignoreDirectories.includes(dirent.name)) {
      console.log("skip", direntPath);
      return;
    } else if (directories.includes(dirent.name)) {
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
  await Promise.all(
    dirents.map((dirent) =>
      cleanDirent(dirent, path.join(dirPath, dirent.name))
    )
  );
  if (dirents.length === 0) {
    console.log("delete", dirPath);
    await fs.rm(dirPath, { recursive: true });
  }
}

const cwd = process.cwd();
console.log("cwd", cwd);
cleanDir(cwd);
