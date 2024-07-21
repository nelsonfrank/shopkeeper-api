import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { UsersModule } from '@/users/users.module';

@Module({
  providers: [StoreService],
  controllers: [StoreController],
  imports: [TypeOrmModule.forFeature([Store]), UsersModule],
})
export class StoreModule {}
