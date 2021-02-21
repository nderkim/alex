const os = require("os");

const privateIPv4Re = /^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\./;
const privateIPv6Re = /^f[c-d][0-9a-f]{2}:/;

const IsPrivate = (family) => (address) => {
  switch (family) {
    case "IPv4":
      return privateIPv4Re.test(address);
    case "IPv6":
      return privateIPv6Re.test(address);
  }
};

// eslint-disable-next-line no-unused-vars
const Localhost = (family) => {
  switch (family) {
    case "IPv4":
      return "127.0.0.1";
    case "IPv6":
      return "::1";
  }
};

const getInterface = (opts) => {
  const { family = "IPv4", name = "" } = opts ?? {};
  const isPrivate = IsPrivate(family);
  // const localhost = Localhost(family);
  const interfaces = os.networkInterfaces();

  const interface = []
    .concat(
      ...Object.entries(interfaces)
        .filter(([k]) => k.startsWith(name))
        .map(([, v]) => v)
    )
    .find(
      (interface) =>
        interface.family === family &&
        // interface.address !== localhost &&
        isPrivate(interface.address)
    );

  return interface;
};

module.exports = () => getInterface().address;
