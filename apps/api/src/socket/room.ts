// Socket io feature to create a room and join a room use rabbitmq

import type { Socket } from "socket.io";
import {
  createRoom,
  receiveMessageFromRoom,
  sendMessageToRoom,
} from "../rabbitmq/room";

const wsRoom = (socket: Socket) => {
  socket.on("create-room", async (roomId) => {
    createRoom(roomId);
    await socket.join(roomId);
    console.log(`room ${roomId} created`);
  });

  socket.on("join-room", async (roomId, userId) => {
    await socket.join(roomId);
    console.log(`user ${userId} joined room ${roomId}`);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("message", (message) => {
      console.log(`Sent message: ${message} from room ${roomId}`);
      sendMessageToRoom(roomId, message);
    });

    // receiveMessageFromRoom(roomId, (msg) => {
    //   socket.to(roomId).emit("message", msg.content.toString());
    // });
  });

  socket.on("leave-room", async (roomId, userId) => {
    await socket.leave(roomId);
    console.log(`user ${userId} left room ${roomId}`);
    socket.to(roomId).emit("user-disconnected", userId);
  });

  socket.on("message-room", (roomId, message) => {
    console.log(`Sent message: ${message} from room ${roomId}`);
    sendMessageToRoom(roomId, message);
    // socket.to(roomId).emit("message", message);
  });
};

export default wsRoom;
