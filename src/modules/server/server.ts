import { app } from "./app/app";
import { Server } from "socket.io";

const server = app.listen(3000, "0.0.0.0");
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
