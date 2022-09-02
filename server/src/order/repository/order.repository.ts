import { Between, DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { getRangeByToday } from '../util/date';

@Injectable()
export class OrderRepository {
  private repository: Repository<Order>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Order);
  }

  public async create(input: CreateOrderDto): Promise<Order> {
    const [today, tomorrow] = getRangeByToday(1);

    const latestOrderNumber = await this.repository.count({
      where: { paymentDate: Between(today, tomorrow) },
    });

    const orderNumber = latestOrderNumber + 1;

    return this.repository.save({ ...input, orderNumber });
  }

  public async findAll(): Promise<Order[]> {
    return this.repository.find({});
  }

  public async findById(id: number): Promise<Order | null> {
    return this.repository.findOne({ where: { id } });
  }
}
