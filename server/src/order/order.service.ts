import { OrderRepository } from './repository/order.repository';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDto } from './dto/order.dto';
import { OrderItemRepository } from './repository/orderItem.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  async create(createOrderDto: OrderDto) {
    const { paymentMethod, paidAmount, totalAmount, orderItems } = createOrderDto;
    const order = await this.orderRepository.create({ paidAmount, totalAmount, paymentMethod });
    const orderId = order.id;

    await Promise.all(
      orderItems.map(({ count, menuItemId }) =>
        this.orderItemRepository.create({ orderId, menuItemId, count }),
      ),
    );

    return order;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
