"use client";

import { type Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Chat } from "@/components/chat";

export default function Page(): JSX.Element {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socketio = io("ws://localhost:4242");
    setSocket(socketio);

    socketio.on("connect", () => {
      console.log("Connected to the server");
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
  }, []);

  const sendMessage = () => {
    socket?.emit("message", "Hello from the client");
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
