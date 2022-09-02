import { Injectable } from '@nestjs/common';
import { MenuItemRepository } from './repository/menuItem.repository';

@Injectable()
export class MenuItemService {
  constructor(private readonly menuRepository: MenuItemRepository) {}

  async findAll() {
    return await this.menuRepository.findAll();
  }

  findOne(id: number) {
    return this.menuRepository.findById(id);
  }
}
