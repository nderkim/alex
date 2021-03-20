import React from "react";
import { render } from "react-dom";
import "./style.css";
import App from "./App";

const socket = new WebSocket(`ws://${location.host}`);
socket.onopen = () => {
  console.log("WebSocket connected");
};

if (process.env?.NODE_ENV === "development") {
  socket.onmessage = async ({ data }) => {
    const outdatedModules = await module.hot?.check(true);
    if (outdatedModules) console.log("[HMR] updated", outdatedModules);
  };
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
