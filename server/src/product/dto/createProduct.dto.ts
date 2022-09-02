import { Product } from 'src/product/entities/product.entity';

import { PickType } from '@nestjs/mapped-types';

export class CreateProductDto extends PickType(Product, [
  'name',
  'sellerId',
  'price',
  'regionId',
  'thumbnails',
  'categoryId',
  'description',
]) {}
