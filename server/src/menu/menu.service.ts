import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuRepository } from './repository/menu.repository';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}
  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  async findAll() {
    return await this.menuRepository.findAll();
  }

  findOne(id: number) {
    return this.menuRepository.findById(id);
  }
}
