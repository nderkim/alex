import { exec } from "child_process";

const platform = process.platform;

const command = (resource: string) => {
  switch (platform) {
    default:
      throw new Error(`platform '${platform}' not supported`);
    case "darwin": {
      return `open '${resource}'`;
    }
    case "linux": {
      return `xdg-open '${resource}'`;
    }
    case "win32": {
      return `start "" "${resource}"`;
    }
  }
};

export default (resource: string): Promise<void> =>
  new Promise<void>((resolve, reject) =>
    exec(command(resource), (err) => (err ? reject(err) : resolve()))
  );
