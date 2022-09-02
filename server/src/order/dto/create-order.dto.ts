import { PickType } from '@nestjs/mapped-types';
import { Order } from '../entities/order.entity';

export class CreateOrderDto extends PickType(Order, [
  'paymentMethod',
  'paidAmount',
  'totalAmount',
]) {}
