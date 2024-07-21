import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { UsersService } from '@/users/users.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private userService: UsersService,
  ) {}

  getAll() {
    return this.storeRepository.find();
  }

  async create(createStoreDto: CreateStoreDto) {
    // eslint-disable-next-line
    const { password, ...storeOwner } = await this.userService.findOne(
      createStoreDto.owner,
    );

    const newStore = this.storeRepository.create({
      ...createStoreDto,
      storeOwner,
    });

    await this.storeRepository.save(newStore);

    return newStore;
  }
}
