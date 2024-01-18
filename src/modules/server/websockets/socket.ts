import { randomUUID } from "crypto";
import { Socket } from "socket.io";

const users = [];
export function handleSockets(socket: Socket) {
  socket.on("openned chat", (args) => {
    console.log(`O user [${args}] abriu o chat!`);

    const roomId = randomUUID();

    socket.join(roomId);

    users.push({ socketId: socket.id, roomId });
    console.log(users);
  });

  socket.on("send message", (args) => {
    console.log(args);
    socket.emit("listen messages", args);
  });
}
