import { NestFactory } from "@nestjs/core";
import { AppModule } from "./rabbitmq/modules/app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { WebSocketModule } from "./websocket/modules/websocket.module";
import { WsAdapter } from "@nestjs/platform-ws";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://user:password@localhost:5672"],
        queue: "cats_queue",
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  console.log("RabbitMQ Microservice is listening");

  const ws = await NestFactory.create(WebSocketModule);
  ws.enableCors();
  ws.useWebSocketAdapter(new WsAdapter(WebSocketModule));
  await ws.listen(3001);
  console.log("Websocket is listening", await ws.getUrl());
}
bootstrap();
