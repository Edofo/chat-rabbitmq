"use client";

import { type Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Chat } from "@/components/chat";

type roomType = {
  roomId: string;
  name: string;
};

export default function Page(): JSX.Element {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rooms, setRooms] = useState<roomType[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socketio = io("ws://localhost:4242");
    setSocket(socketio);

    socketio.on("connect", () => {
      console.log("Connected to the server");
    });

    socketio.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    socketio.on("message", (message) => {
      console.log(`Received: ${message}`);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketio.on("user-connected", (userId) => {
      console.log(`User connected: ${userId}`);
    });

    socketio.on("user-disconnected", (userId) => {
      console.log(`User disconnected: ${userId}`);
    });

    socketio.on("created-room", (room) => {
      console.log(`Room created: ${room}`);
    });

    socketio.emit("retrieve-all-room-messages");

    socketio.on("all-rooms", (roomsData: string) => {
      setRooms(JSON.parse(roomsData));
      console.log(`All room messages: ${roomsData}`);
    });
  }, []);

  const sendMessage = () => {
    socket?.emit("message", "room1", "Hello from the client");
    console.log("Sending message");
  };

  const createRoom = () => {
    socket?.emit("create-room", "room1");
    console.log("Creating room");
  };

  const joinRoom = () => {
    socket?.emit("join-room", "room1", "user1");
    console.log("Joining room");
  };

  const leaveRoom = () => {
    socket?.emit("leave-room", "room1", "user1");
    console.log("Leaving room");
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 dark:bg-gray-900">
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={leaveRoom}>Leave Room</button>

      {rooms.map((room) => (
        <div key={room.roomId}>{room.name}</div>
      ))}

      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}

      {/* <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Chat />
      </div> */}
    </div>
  );
}
