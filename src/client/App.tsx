import React from "react";

import alexKidd from "./assets/images/alex-kidd.png";

import Terminal from "./components/terminal";

import style from "./style.module.scss";

import WebSocket from "./websocket";

const webSocket = WebSocket("ws://localhost:2539");

export default () => (
  <div className={style.app}>
    <img src={alexKidd}></img>
    <p>Hello, world!</p>
    <Terminal stdio={webSocket} />
  </div>
);
