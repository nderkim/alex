import os from "os";

const privateIPv4Re = /^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\./;
const privateIPv6Re = /^f[c-d][0-9a-f]{2}:/;

type Family = "IPv4" | "IPv6";

const IsPrivate = (family: Family) => (address: string) => {
  switch (family) {
    case "IPv4":
      return privateIPv4Re.test(address);
    case "IPv6":
      return privateIPv6Re.test(address);
  }
};

const Localhost = (family: Family) => {
  switch (family) {
    case "IPv4":
      return "127.0.0.1";
    case "IPv6":
      return "::1";
  }
};

const getInterface = (opts?: { family: Family; name: string }) => {
  const { family = "IPv4", name = "" } = opts ?? {};
  const isPrivate = IsPrivate(family);
  // const localhost = Localhost(family);
  const networkInterfaces = os.networkInterfaces();

  const networkInterface = ([] as os.NetworkInterfaceInfo[])
    .concat(
      ...Object.entries(networkInterfaces)
        .filter(([k]) => k.startsWith(name))
        .map(([, v]) => v)
        .filter((x): x is os.NetworkInterfaceInfo[] => x !== undefined)
    )
    .find(
      (networkInterface) =>
        networkInterface.family === family &&
        // networkInterface.address !== localhost &&
        isPrivate(networkInterface.address)
    );

  return networkInterface;
};

export default (): string | undefined => getInterface()?.address;
