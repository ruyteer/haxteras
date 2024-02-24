import { Server } from "socket.io";

import { createServer } from "http";
import { app } from "./app/app";
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.VITE_URL,
  },
});

server.listen(3000, "0.0.0.0");
