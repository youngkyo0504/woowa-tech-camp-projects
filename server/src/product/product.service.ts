import { LikeRepository } from './repository/like.repository';
import { ProductRepository } from './repository/product.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProductDto';
import { LikeDto } from './dto/like.dto';
import { GetProductDto } from './dto/getProductDetail.dto';
import { CategoryRepository } from './repository/category.repository';
import { Category } from './entities/category.entity';
import extractRegionsFromUserRegions from 'src/util/parseUtil';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly likeRepository: LikeRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  getProduct(productId: number): Promise<Product> {
    return this.productRepository.findOneByProductId(productId);
  }

  formatProductForDto(product: Product): GetProductDto {
    const {
      seller: { regions: rawSellerRegion, ...sellerData },
      ...restData
    } = product;
    const parsedSellerRegion = extractRegionsFromUserRegions(rawSellerRegion);
    const parsedProduct: GetProductDto = {
      ...restData,
      seller: { regions: parsedSellerRegion, ...sellerData },
    };
    return parsedProduct;
  }

  async getPagedProducts(
    startProductId: number,
    regionId: number,
    categoryId: number,
    limit: number,
  ): Promise<{
    products: GetProductDto[];
    nextStartParam: number | undefined;
  }> {
    const products = await this.productRepository.findProductsWithLimit(
      startProductId,
      limit,
      regionId,
      categoryId,
    );

    const formattedProducts = products.map((product) =>
      this.formatProductForDto(product),
    );

    const isEnd = products[limit];

    const nextStartParam = isEnd ? products[limit].id : undefined;
    if (isEnd) {
      products.pop();
    }

    return { products: formattedProducts, nextStartParam };
  }

  createNewProduct(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }

  updateProductById(
    id: number,
    sellerId: number,
    updateProductDto: UpdateProductDto,
  ) {
    return this.productRepository.patchProductById(
      id,
      sellerId,
      updateProductDto,
    );
  }

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async deleteProduct(productId: number, userId: number) {
    const product = await this.getProduct(productId);
    if (product.sellerId === userId) {
      throw new HttpException(
        '삭제 권한이 없는 사용자입니다.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      this.productRepository.deleteProductById(productId);
    }
  }

  async toggleLikeState(likeDto: LikeDto) {
    const like = await this.likeRepository.findLike(likeDto);
    if (like) {
      await this.likeRepository.deleteLike(likeDto);
    } else {
      await this.likeRepository.addLike(likeDto);
    }
  }

  async getLikedProducts(userId: number) {
    const likes = await this.likeRepository.findLikeByUser(userId);
    return likes.map((like) => like.product);
  }

  async getMySalesProducts(userId: number) {
    return await this.productRepository.findBySellerId(userId);
  }
}
