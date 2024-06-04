"use client";

import styles from "./page.module.css";
import { Client } from "@stomp/stompjs";
import { useEffect } from "react";
import { WebSocket } from "ws";

export default function Page(): JSX.Element {
  // Object.assign(global, { WebSocket });
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:15674/ws",
      connectHeaders: {
        login: "user",
        passcode: "password",
      },
    });

    client.activate();

    client.onConnect = () => {
      console.log("Connected");
    };
  }, []);

  return <main className={styles.main}>aas</main>;
}
