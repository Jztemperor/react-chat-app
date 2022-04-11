import React from "react";
import ReactDOM from "react-dom";
import { SocketContext } from "./contexts/SocketContext";
import App from "./App";
import styles from "./index.module.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
