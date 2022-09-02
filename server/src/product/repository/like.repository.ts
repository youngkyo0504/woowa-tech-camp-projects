import { Like } from './../entities/like.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { LikeDto } from '../dto/like.dto';

@Injectable()
export class LikeRepository {
  private repository: Repository<Like>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Like);
  }

  public async findLike({ productId, userId }: LikeDto) {
    return await this.repository.findOne({
      where: {
        productId,
        userId,
      },
    });
  }

  public async findLikeByUser(userId: number) {
    try {
      return await this.repository.find({
        where: { userId },
        relations: ['product.likedUsers', 'product.region'],
      });
    } catch (e) {
      throw new HttpException(
        '찜한 상품 가져오기를 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteLike({ productId, userId }: LikeDto) {
    try {
      await this.repository.delete({
        productId,
        userId,
      });
    } catch (e) {
      throw new HttpException(
        '좋아요 취소에 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async addLike({ productId, userId }: LikeDto) {
    try {
      await this.repository.save({
        productId,
        userId,
      });
    } catch (e) {
      throw new HttpException(
        '좋아요 추가에 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
