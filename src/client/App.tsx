import React from "react";

import alexKidd from "./assets/images/alex-kidd.png";

import style from "./style.module.scss";

export default () => (
  <div className={style.app}>
    <img src={alexKidd}></img>
    <p>Hello, world!</p>
  </div>
);
