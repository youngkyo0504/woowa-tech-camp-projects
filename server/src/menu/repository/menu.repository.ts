import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Menu } from '../entities/menu.entity';

@Injectable()
export class MenuRepository {
  private repository: Repository<Menu>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Menu);
  }

  public async findAll(): Promise<Menu[]> {
    return this.repository.find({
      relations: {
        menuItem: true,
      },
    });
  }

  public async findById(id: number): Promise<Menu> {
    return this.repository.findOne({ where: { id } });
  }
}
