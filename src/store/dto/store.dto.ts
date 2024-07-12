import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  storeName: string;

  @IsString()
  storeAddress: string;
}

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
