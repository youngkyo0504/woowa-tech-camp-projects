import { Product } from 'src/product/entities/product.entity';
import { PickType } from '@nestjs/mapped-types';

export class GetRegionProductAPIDto extends PickType(Product, [
  'id',
  'name',
  'price',
  'region',
  'salesStatus',
  'createdAt',
  'likedUsers',
]) {
  thumbnail: string;
}
