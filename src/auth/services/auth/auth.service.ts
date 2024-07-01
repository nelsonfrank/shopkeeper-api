import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneWithEmail(email);

    if (!user) {
      throw new BadRequestException(`user with email ${email} not found`, {
        cause: new Error(),
        description: 'invalid credentials',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('email or password is incorrect!', {
        cause: new Error(),
        description: 'invalid credentials',
      });
    }

    if (!user) return;

    const payload = {
      sub: user.id,
      username: `${user.firstName} ${user.lastName}`,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    if (!user) return;

    const payload = {
      sub: user.id,
      username: `${user.firstName} ${user.lastName}`,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
