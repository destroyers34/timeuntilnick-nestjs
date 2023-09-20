import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('isnickworking')
  isNickWorking(): string {
    return this.appService.isNickWorking().toString();
  }

  @Get('untilnick')
  untilNick(): string {
    return this.appService.untilNick().toString();
  }
}
