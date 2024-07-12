import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto, UserDto } from '@/auth/dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email, password) {
    const user = await this.usersService.findOneWithEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto.email, signInDto.password);

    if (!user) {
      throw new BadRequestException('email or password is incorrect!', {
        cause: new Error(),
        description: 'invalid credentials',
      });
    }

    const payload = {
      sub: user.id,
      username: `${user.firstName} ${user.lastName}`,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneWithEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('Email already exist!', {
        cause: new Error(),
        description: 'Email must be unique, try different email address',
      });
    }

    const newUser = await this.usersService.create(createUserDto);

    const payload = {
      sub: newUser.id,
      username: `${newUser.firstName} ${newUser.lastName}`,
    };

    return {
      ...payload,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(user: UserDto) {
    const payload = {
      sub: user.id,
      username: `${user.firstName} ${user.lastName}`,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
