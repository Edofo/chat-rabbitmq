import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("cats")
  getHello(@Ctx() context: RmqContext): string {
    console.log("Message: ", context.getMessage());
    console.log("Channel: ", context.getChannelRef());
    return this.appService.getHello();
  }
}
