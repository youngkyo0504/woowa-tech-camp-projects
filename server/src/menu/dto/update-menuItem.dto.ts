import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menuItem.dtd';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {}
