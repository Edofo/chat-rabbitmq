import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat/gateway/chat.gateway";
import { ChatService } from "./chat/services/chat.service";

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class WebSocketModule {}
