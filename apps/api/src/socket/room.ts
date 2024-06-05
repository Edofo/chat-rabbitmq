// Socket io feature to create a room and join a room use rabbitmq

import type { Server, Socket } from "socket.io";
import {
  createRoom,
  deleteRoom,
  receiveMessageFromQueue,
  sendMessageToQueue,
} from "../rabbitmq/room";
import { retrieveData, storeData } from "../helpers/jsonHelpers";
import { uuid } from "uuidv4";

const wsRoom = (wss: Server, socket: Socket) => {
  socket.on("retrieve-all-room-messages", () => {
    const data = retrieveData(__dirname + "/../data/rooms.json");
    socket.emit("all-rooms", JSON.stringify(data));
  });

  socket.on("create-room", async (name) => {
    const roomId = uuid();
    createRoom(roomId, async () => {
      await socket.join(roomId);
      storeData({ roomId, name }, __dirname + "/../data/rooms.json");
      receiveMessageFromQueue(roomId, (msg) => {
        wss.to(roomId).emit("message", msg.content.toString());
      });
      console.log(`room ${roomId} created`);
      wss.emit("created-room", { roomId, name });
    });
  });

  socket.on("join-room", async (roomId, userId) => {
    await socket.join(roomId);
    console.log(`user ${userId} joined room ${roomId}`);
    wss.to(roomId).emit("user-connected", userId);
    // send all messages from queue to user
    receiveMessageFromQueue(roomId, (msg) => {
      // console.log(`Retrieved message: ${msg.content.toString()}`);
      wss.to(socket.id).emit("message", msg.content.toString());
    });
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
    // check if user is in this room
    if (!socket.rooms.has(roomId)) {
      console.log(`User not in room ${roomId}`);
      return;
    }
    await socket.leave(roomId);
    console.log(`user ${userId} left room ${roomId}`);
    wss.to(roomId).emit("user-disconnected", userId);
  });

  socket.on("delete-room", async (roomId) => {
    // check if user is in this room
    if (!socket.rooms.has(roomId)) {
      console.log(`User not in room ${roomId}`);
      return;
    }
    await socket.leave(roomId);
    deleteRoom(roomId);
    console.log(`room ${roomId} deleted`);
  });
};

export default wsRoom;
