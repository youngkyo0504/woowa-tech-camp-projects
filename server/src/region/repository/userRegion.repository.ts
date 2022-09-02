import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserRegion } from '../entities/userRegion.entity';
import { CreateUserRegionDto } from '../dto/createUserRegion.dto';

@Injectable()
export class UserRegionRepository {
  private repository: Repository<UserRegion>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserRegion);
  }

  public async create({
    isPrimary,
    regionId,
    userId,
  }: CreateUserRegionDto): Promise<UserRegion> {
    const newUserRegion = this.repository.create({
      isPrimary,
      regionId,
      userId,
    });
    return this.repository.save(newUserRegion);
  }

  public async findByUserId(userId: number) {
    return this.repository.find({ where: { userId }, relations: ['region'] });
  }

  public async updateIsPrimary(
    userId: number,
    regionId: number,
    isPrimary: boolean,
  ) {
    return this.repository.update(
      { userId, regionId },
      {
        isPrimary,
      },
    );
  }

  public async deleteByRegionId(regionId: number, userId: number) {
    return this.repository.delete({ regionId, userId });
  }
}
