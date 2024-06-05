import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ChatService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  sendMessage(message: string) {
    this.server.emit("message", message);
  }

  async listenForEvents(socket: Socket) {
    const message = fromEvent(socket, "message");
    const disconnect = fromEvent(socket, "disconnect");

    message
      .pipe(
        map(async (msg: string) => {
          // TODO: Send message to RabbitMQ
          this.server.emit("message", msg);
        }),
      )
      .subscribe();

    disconnect
      .pipe(
        map(async () => {
          // TODO: Handle user disconnect event
          console.log("User disconnected");
        }),
      )
      .subscribe();
  }
}
