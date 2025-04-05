import express from "express";
import { WebSocketServer } from "ws";
import { ConfiguredMatrix } from 'matrix';

const app = express();
const PORT = 3000;

// Create an HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Create a WebSocket server
const wss = new WebSocketServer({ server });

const matrix = new ConfiguredMatrix();

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());

      if(data?.command === 'test') {
       matrix.testBlueSquare().sync();
      }if (data.command) {
        console.log(`Received command: ${data.command}`);
      } else {
        console.log("Invalid message format");
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is ready to receive messages.");
