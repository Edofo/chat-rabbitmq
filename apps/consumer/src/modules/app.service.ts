import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    console.log("Hello from consumer", this.constructor.name);
    return "Hello World!";
  }
}
