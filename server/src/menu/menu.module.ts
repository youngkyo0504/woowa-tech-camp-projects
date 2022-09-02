import { MenuItemRepository } from './repository/menuItem.repository';
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from './repository/menu.repository';
import { MenuItemService } from './menuItem.service';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository, MenuItemRepository, MenuItemService],
})
export class MenuModule {}
