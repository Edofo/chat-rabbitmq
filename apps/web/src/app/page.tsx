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
  const [currentRoom, setCurrentRoom] = useState<roomType | null>(null);

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
    if (!currentRoom) return;
    socket?.emit("message", currentRoom.roomId, "Hello from the client");
    console.log("Sending message");
  };

  const createRoom = (name: string) => {
    socket?.emit("create-room", name);
    console.log("Creating room");
  };

  const joinRoom = (roomId: string) => {
    const existingRoom = rooms.find((room) => room.roomId === roomId);
    if (!existingRoom || currentRoom?.roomId === roomId) return;
    if (currentRoom) leaveRoom();
    socket?.emit("join-room", roomId, "user1");
    setCurrentRoom(existingRoom);
    console.log("Joining room");
  };

  const leaveRoom = () => {
    if (!currentRoom) return;
    socket?.emit("leave-room", currentRoom.roomId, "user1");
    console.log("Leaving room");
    setMessages([]);
    setCurrentRoom(null);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 dark:bg-gray-900">
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={() => createRoom("test")}>Create Room</button>
      {/* <button onClick={joinRoom}>Join Room</button> */}
      {/* <button onClick={leaveRoom}>Leave Room</button> */}

      {rooms.map((room) => (
        <div key={room.roomId} className="flex gap-3">
          <p>{room.name}</p>
          <button onClick={() => joinRoom(room.roomId)}>rejoindre</button>
        </div>
      ))}

      <button onClick={() => leaveRoom()}>Quitter la room</button>

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
