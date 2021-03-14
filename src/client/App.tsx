import React from "react";

import alexKidd from "./assets/images/alex-kidd.png";

import Greeting from "./components/greeting";
// import Terminal from "./components/terminal";

import style from "./style.module.scss";

// import WebSocket from "./websocket";

// const webSocket = WebSocket("ws://localhost:2539");

const App = () => {
  return (
    <div className={style.app}>
      <img src={alexKidd}></img>
      <Greeting />
      {/* <Terminal stdio={webSocket} /> */}
    </div>
  );
};

export default App;
