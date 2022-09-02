import { PartialType, PickType } from '@nestjs/mapped-types';
import { Product } from '../entities/product.entity';

export class UpdateProductDto extends PartialType(
  PickType(Product, [
    'name',
    'price',
    'salesStatus',
    'thumbnails',
    'categoryId',
    'description',
  ]),
) {}
