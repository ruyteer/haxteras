import { Server } from "socket.io";

import { createServer } from "http";
import { app } from "./app/app";
import { handleSockets } from "./websockets/socket";
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.VITE_URL,
  },
});

io.on("connection", (socket) => {
  handleSockets(socket);
});

server.listen(3000);
