// Socket io feature to create a room and join a room use rabbitmq

import type { Server, Socket } from "socket.io";
import {
  createRoom,
  deleteRoom,
  receiveMessageFromQueue,
  sendMessageToQueue,
} from "../rabbitmq/room";

const wsRoom = (wss: Server, socket: Socket) => {
  socket.on("create-room", async (roomId) => {
    createRoom(roomId);
    await socket.join(roomId);
    receiveMessageFromQueue(roomId, (msg) => {
      wss.to(roomId).emit("message", msg.content.toString());
    });
    console.log(`room ${roomId} created`);
  });

  socket.on("join-room", async (roomId, userId) => {
    await socket.join(roomId);
    console.log(`user ${userId} joined room ${roomId}`);
    wss.to(roomId).emit("user-connected", userId);
  });

  socket.on("message", (roomId, message) => {
    // check if user is in this room
    if (!socket.rooms.has(roomId)) {
      console.log(`User not in room ${roomId}`);
      return;
    }
    console.log(`Sent message: ${message} from room ${roomId}`);
    sendMessageToQueue(roomId, message);
  });

  socket.on("leave-room", async (roomId, userId) => {
    await socket.leave(roomId);
    console.log(`user ${userId} left room ${roomId}`);
    wss.to(roomId).emit("user-disconnected", userId);
  });

  socket.on("delete-room", async (roomId) => {
    await socket.leave(roomId);
    deleteRoom(roomId);
    console.log(`room ${roomId} deleted`);
  });
};

export default wsRoom;
