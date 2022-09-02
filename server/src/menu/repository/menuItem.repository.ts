import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MenuItem } from '../entities/menuItem.entity';
import { UpdateMenuItemDto } from '../dto/update-menuItem.dto';
import { CreateMenuItemDto } from '../dto/create-menuItem.dtd';

@Injectable()
export class MenuItemRepository {
  private repository: Repository<MenuItem>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(MenuItem);
  }

  public async create(input: CreateMenuItemDto): Promise<MenuItem> {
    return this.repository.save({ ...input });
  }

  public async findAll(): Promise<MenuItem[]> {
    return this.repository.find({});
  }

  public async findById(id: number): Promise<MenuItem | null> {
    return this.repository.findOne({ where: { id } });
  }

  public async update(id: number, input: UpdateMenuItemDto) {
    await this.repository.update(id, { ...input });
  }
}
