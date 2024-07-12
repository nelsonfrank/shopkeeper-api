import { Body, Controller, Post } from '@nestjs/common';
import { CreateStoreDto } from './dto/store.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Post()
  create(@Body() createUserDto: CreateStoreDto) {
    return this.storeService.create(createUserDto);
  }
}
