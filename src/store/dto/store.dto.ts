import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  storeName: string;

  @IsString()
  storeAddress: string;

  @IsNumber()
  owner: number;
}

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
