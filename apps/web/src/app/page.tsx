"use client";

import { type Socket, io } from "socket.io-client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Component } from "@/components/component/component";

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
    <div>
      <h1>Socket.io</h1>
      <Component />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}
