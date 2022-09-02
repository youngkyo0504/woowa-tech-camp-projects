import { CreateProductDto } from '../dto/createProduct.dto';
import { DataSource, LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { SalesStatusEnum } from 'src/common/enums';
import { UpdateProductDto } from '../dto/updateProductDto';

@Injectable()
export class ProductRepository {
  private repository: Repository<Product>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Product);
  }

  public async findProductsByRegion(regionId: number): Promise<Product[]> {
    return this.repository.find({
      where: { regionId },
      relations: ['region', 'likedUsers', 'chatRooms'],
    });
  }

  public async createProduct(input: CreateProductDto): Promise<Product> {
    try {
      return this.repository.save({
        ...input,
        salesStatus: SalesStatusEnum.SALE,
      });
    } catch (error) {
      throw new HttpException(
        '상품 만들기를 실패했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async findOneByProductId(id: number) {
    try {
      return this.repository.findOne({
        where: { id },
        relations: [
          'region',
          'category',
          'seller.regions.region',
          'likedUsers',
          'chatRooms',
        ],
      });
    } catch (e) {
      throw new HttpException(
        '존재하지 않는 상품입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async findProductsWithLimit(
    startProductId: number,
    limit: number,
    regionId: number,
    categoryId: number,
  ) {
    return this.repository.find({
      where: {
        id: startProductId ? LessThan(startProductId) : undefined,
        regionId: regionId,
        categoryId: categoryId,
      },
      order: { id: 'DESC' },
      relations: [
        'region',
        'likedUsers',
        'category',
        'seller.regions.region',
        'chatRooms',
      ],
      take: limit + 1,
    });
  }

  public async patchProductById(
    id: number,
    sellerId: number,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.findOneByProductId(id);
    if (product.seller.id !== sellerId) {
      throw new HttpException(
        '상품 판매자가 아닙니다.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    try {
      return this.repository.update({ id }, { ...updateProductDto });
    } catch (error) {
      throw new HttpException(
        '상품 업데이트를 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteProductById(id: number) {
    try {
      return this.repository.delete({ id });
    } catch (e) {
      throw new HttpException(
        '상품 삭제에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findBySellerId(sellerId: number) {
    try {
      return this.repository.find({
        where: { sellerId },
        relations: ['region', 'likedUsers', 'chatRooms'],
      });
    } catch (e) {
      throw new HttpException(
        '내 상품 판매 목록을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
