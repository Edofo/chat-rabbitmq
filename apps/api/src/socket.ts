import { Server } from "socket.io";
import { receiveMessage, sendMessage } from "./rabbitmq";

const socket = () => {
  const server = new Server({
    cors: {
      origin: "*",
    },
  });

  server.on("connection", (socket) => {
    console.log(`client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`client disconnected: ${socket.id}`);
    });

    socket.on("message", (message) => {
      console.log(`Received socketio: ${message}`);
      //   server.emit("message", message);
      sendMessage(message);
    });
  });

  receiveMessage((msg) => {
    server.emit("message", msg.content.toString());
  });

  server.listen(4242);
  console.log(`server started at ws://localhost:4242`);
};

export default socket;
