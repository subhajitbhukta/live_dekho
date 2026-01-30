const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let producerSocket = null;
let viewerSocket = null;

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.role === "producer") producerSocket = ws;
    if (data.role === "viewer") viewerSocket = ws;

    // forward messages
    if (data.to === "viewer" && viewerSocket) {
      viewerSocket.send(JSON.stringify(data));
    }

    if (data.to === "producer" && producerSocket) {
      producerSocket.send(JSON.stringify(data));
    }
  });

  ws.on("close", () => {
    if (ws === producerSocket) producerSocket = null;
    if (ws === viewerSocket) viewerSocket = null;
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

