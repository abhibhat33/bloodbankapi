import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() req) {
    return req.user;
  }
}
