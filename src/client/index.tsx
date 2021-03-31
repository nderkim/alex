import React from "react";
import { render } from "react-dom";

import { check } from "../../lib/common/hmr";

import "./style.css";
import App from "./App";

const socket = new WebSocket(`ws://${location.host}`);
socket.onopen = () => {
  console.log("WebSocket connected");
};

if (process.env?.NODE_ENV === "development") {
  socket.onmessage = ({ data }) => data === "[HMR]" && check();
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
