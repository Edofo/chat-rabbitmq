"use client";

import { type Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Chat } from "@/components/chat";

export default function Page(): JSX.Element {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketio = io("ws://localhost:4242");
    setSocket(socketio);

    socketio.on("connect", () => {
      console.log("Connected to the server");
    });

    socketio.on("message", (message) => {
      console.log(`Received: ${message}`);
    });
  }, []);

  const sendMessage = () => {
    socket?.emit("message", "Hello from the client");
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
