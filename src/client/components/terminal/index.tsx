import React from "react";

import { PubSub } from "../../../../lib/common/types";

import Input, { HandleType as InputHandleType } from "./input";

import style from "./style.module.scss";

type Props = {
  stdio: PubSub<string>;
};

const prompt = "> ";

export default ({ stdio }: Props) => {
  const inputRef = React.useRef<InputHandleType>(null);

  const [history, setHistory] = React.useState<string>("");

  const appendHistory = React.useCallback<(data: string) => void>(
    (data) => setHistory((history) => history.concat(data)),
    []
  );

  React.useEffect(() => stdio.subscribe(appendHistory), []);

  return (
    <div
      className={style.terminal}
      tabIndex={-1}
      onFocus={() => inputRef.current?.focus()}
    >
      <pre>
        {history}
        {prompt}
        <Input
          ref={inputRef}
          onInput={(data) => {
            stdio.publish(data + "\n");
            inputRef.current?.clear();
            appendHistory(prompt + data + "\n");
          }}
        />
      </pre>
    </div>
  );
};
