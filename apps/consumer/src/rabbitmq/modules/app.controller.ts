import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("cats")
  getCats(): string {
    return this.appService.getHello();
  }
}
