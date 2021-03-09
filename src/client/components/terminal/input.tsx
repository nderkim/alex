import React from "react";

import style from "./style.module.scss";

export type HandleType = {
  focus: () => void;
  clear: () => void;
};

type PropsType = {
  onInput: (data: string) => void;
};

export default React.forwardRef<HandleType, PropsType>(
  (props, forwardedRef) => {
    const { onInput } = props;

    const ref = React.useRef<HTMLSpanElement>(null);

    React.useImperativeHandle(forwardedRef, () => ({
      focus: () => ref.current?.focus(),
      clear: () => {
        if (!ref.current) return;
        ref.current.textContent = null;
      },
    }));

    return (
      <span
        ref={ref}
        contentEditable
        className={style.input}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.altKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            !e.shiftKey
          ) {
            e.preventDefault();
            const el = e.target as HTMLElement;
            const data = el.textContent;
            if (data !== null) onInput(data);
          }
        }}
      ></span>
    );
  }
);
