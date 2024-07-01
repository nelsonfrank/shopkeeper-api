import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from '@/users/dto/user.dto';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignUpDto extends CreateUserDto {}
