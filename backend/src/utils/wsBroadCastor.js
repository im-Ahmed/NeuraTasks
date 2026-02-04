import { wss } from "../../app.js";
// Broadcast data to all connected clients

export function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}
