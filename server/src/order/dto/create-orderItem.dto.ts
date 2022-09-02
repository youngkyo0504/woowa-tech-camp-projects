import { OmitType } from '@nestjs/mapped-types';
import { OrderItem } from '../entities/orderItem.entity';

export class createOrderItemDto extends OmitType(OrderItem, ['id', 'menuItem', 'order']) {}
