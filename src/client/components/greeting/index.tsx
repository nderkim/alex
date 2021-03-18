import React from "react";

import voidify from "../../../../lib/common/voidify";

const Component: React.FC = () => {
  const [data, setData] = React.useState<string>();

  React.useEffect(
    voidify(async () => setData(await (await fetch("/hello")).text())),
    []
  );

  return <div>{data}</div>;
};

export default Component;
