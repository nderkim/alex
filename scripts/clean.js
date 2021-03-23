const fs = require("fs").promises;
const path = require("path");

const deleteList = ["dist", "build", "node_modules"];
const ignoreList = [".git"];

const cleanDirent = (dirPath) => async (dirent) => {
  const direntPath = path.join(dirPath, dirent.name);
  if (ignoreList.includes(direntPath)) {
    console.log("skip", direntPath);
    return dirent;
  } else if (deleteList.includes(direntPath)) {
    console.log("delete", direntPath);
    await fs.rm(direntPath, { recursive: true });
    return null;
  } else if (dirent.isDirectory()) {
    return (await cleanDir(direntPath)) && dirent;
  } else {
    return dirent;
  }
};

async function cleanDir(dirPath) {
  const dirents = (
    await Promise.all(
      (await fs.readdir(dirPath, { withFileTypes: true })).map(
        cleanDirent(dirPath)
      )
    )
  ).filter(Boolean);
  if (dirents.length === 0) {
    console.log("delete", dirPath);
    await fs.rm(dirPath, { recursive: true });
    return null;
  } else {
    return dirents;
  }
}

process.chdir(path.join(__dirname, ".."));
console.log("cwd", process.cwd());
cleanDir(".");
