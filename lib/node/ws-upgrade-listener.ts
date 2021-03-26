import WebSocket from "ws";

import type { IncomingMessage } from "http";
import type { UpgradeListener } from "./http-server";

type ConnectionHandler = (ws: WebSocket, req: IncomingMessage) => void;

export default (connectionHandler: ConnectionHandler): UpgradeListener => {
  const ws = new WebSocket.Server({ noServer: true });

  return (req, socket, head) =>
    ws.handleUpgrade(req, socket, head, connectionHandler);
};
