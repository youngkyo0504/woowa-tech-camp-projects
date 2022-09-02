import { OrderItemRepository } from './repository/orderItem.repository';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './repository/order.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {}
