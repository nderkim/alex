import http from "http";

import WebSocket from "ws";

import { UpgradeListener } from "./http-server";

type ConnectionHandler = (ws: WebSocket, req: http.IncomingMessage) => void;

export default (connectionHandler: ConnectionHandler): UpgradeListener => {
  const ws = new WebSocket.Server({ noServer: true });

  return (req, socket, head) =>
    ws.handleUpgrade(req, socket, head, connectionHandler);
};
