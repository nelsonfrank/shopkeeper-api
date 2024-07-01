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
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from '@/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
