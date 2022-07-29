import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get('/')
  getHello(@Res() res) {
    return res.redirect('/api')
  }
}
