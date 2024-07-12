import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  create(createStoreDto: CreateStoreDto) {
    return {
      ...createStoreDto,
    };
  }
}
