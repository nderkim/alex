import React from "react";

export default () => {
  const [data, setData] = React.useState<string>();

  React.useEffect(
    async (): void => setData(await (await fetch("/hello")).text()),
    []
  );

  return <div>{data}</div>;
};
