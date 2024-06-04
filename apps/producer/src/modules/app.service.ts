import { Inject, Injectable } from "@nestjs/common";
// import * as amqp from "amqplib/callback_api";
import { ClientProxy } from "@nestjs/microservices";
import { timeout } from "rxjs";

@Injectable()
export class AppService {
  constructor(@Inject("CATS_SERVICE") private rabbitClient: ClientProxy) {}

  getHello() {
    console.log("Hello from producer", this.constructor.name);
    return this.rabbitClient.send("cats", {}).pipe(timeout(5000));
  }
}
