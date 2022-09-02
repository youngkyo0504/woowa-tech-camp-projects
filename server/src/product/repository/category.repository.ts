import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository {
  private repository: Repository<Category>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Category);
  }

  public async findAll() {
    return await this.repository.find();
  }
}
