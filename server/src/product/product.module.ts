import { AuthenticationModule } from './../authentication/authentication.module';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './repository/product.repository';
import { LikeRepository } from './repository/like.repository';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [AuthenticationModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    LikeRepository,
    CategoryRepository,
  ],
})
export class ProductModule {}
