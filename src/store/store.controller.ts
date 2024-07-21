import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStoreDto } from './dto/store.dto';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Post()
  create(@Body() createUserDto: CreateStoreDto) {
    return this.storeService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.storeService.getAll();
  }
}
