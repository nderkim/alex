import React from "react";

import { voidify } from "../../../../lib/common/type-helpers";

const Component: React.FC = () => {
  const [data, setData] = React.useState<string>();

  React.useEffect(
    voidify(async () => setData(await (await fetch("/hello")).text())),
    []
  );

  return <div>{data}</div>;
};

export default Component;
