import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOneWithEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async create(createUserDto: CreateUserDto) {
    const userFound = this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userFound) {
      throw new BadRequestException('Email already exist!', {
        cause: new Error(),
        description: 'Email must be unique, try different email address',
      });
    }

    const user = await this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
