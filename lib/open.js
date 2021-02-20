const { exec } = require("child_process");

const platform = process.platform;

const command = (target) => {
  switch (platform) {
    default:
      throw new Error(`platform '${platform}' not supported`);
    case "darwin": {
      return `open '${target}'`;
    }
    case "linux": {
      return `xdg-open '${target}'`;
    }
    case "win32": {
      return `start "" "${target}"`;
    }
  }
};

module.exports = (target) =>
  new Promise((resolve, reject) =>
    exec(command(target), (err) => (err ? reject(err) : resolve()))
  );
