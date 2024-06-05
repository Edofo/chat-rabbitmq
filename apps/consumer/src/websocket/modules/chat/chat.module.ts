import { Module } from "@nestjs/common";
import { ChatGateway } from "./gateway/chat.gateway";
import { ChatService } from "./services/chat.service";

@Module({
  controllers: [ChatGateway],
  providers: [ChatService],
})
export class ChatModule {}
