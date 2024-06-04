import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  getHello() {
    console.log("Hello from producer", this.constructor.name);
    return this.appService.getHello();
  }
}
