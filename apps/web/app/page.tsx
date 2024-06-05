"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Page(): JSX.Element {
  useEffect(() => {
    const socket = io("ws://localhost:80");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (message) => {
      console.log("Received message: ", message);
    });

    socket.emit("message", "Hello from client");

    return () => {
      socket.disconnect();
    };
  }, []);

  return <main className={styles.main}>aas</main>;
}
