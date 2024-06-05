import { Server } from "socket.io";
import wsRoom from "./room";
const wss = new Server({
  cors: {
    origin: "*",
  },
});

const socketInit = () => {
  wss.on("connection", (socket) => {
    console.log(`client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`client disconnected: ${socket.id}`);
    });

    // ROOMs
    wsRoom(wss, socket);
  });

  // receiveMessage((msg) => {
  //   wss.emit("message", msg.content.toString());
  // });

  wss.listen(4242);
  console.log(`Web socket server started at ws://localhost:4242`);
};

export default socketInit;
