import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrderItem } from '../entities/orderItem.entity';
import { createOrderItemDto } from '../dto/create-orderItem.dto';

@Injectable()
export class OrderItemRepository {
  private repository: Repository<OrderItem>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(OrderItem);
  }

  public async create(input: createOrderItemDto): Promise<OrderItem> {
    return this.repository.save({ ...input });
  }
}
