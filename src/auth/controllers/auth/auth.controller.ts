import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '@/auth/services/auth/auth.service';
import { AuthGuard } from '@/auth/guards/auth/auth.guard';

import { Public } from '@/auth/decorators/auth/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('here');
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
