import { CreateRegionDto } from './../dto/createRegion.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Region } from '../entities/region.entity';

@Injectable()
export class RegionRepository {
  private repository: Repository<Region>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Region);
  }

  public async create(input: CreateRegionDto): Promise<Region> {
    return this.repository.save({ ...input });
  }

  public async findByKeyword(keyword: string): Promise<Region[]> {
    return this.repository.find({
      where: {
        address: Like(`%${keyword}%`),
      },
    });
  }
}
