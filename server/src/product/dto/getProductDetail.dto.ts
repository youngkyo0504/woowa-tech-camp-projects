import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { OmitType } from '@nestjs/mapped-types';

class ProductDetailSellerDto extends OmitType(User, ['regions']) {
  regions: {
    id: number;
    address: string;
  }[];
}

export class GetProductDto extends OmitType(Product, ['seller']) {
  seller: ProductDetailSellerDto;
}
