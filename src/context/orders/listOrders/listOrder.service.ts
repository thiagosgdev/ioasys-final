import { Injectable, Inject } from '@nestjs/common';
import { Order } from 'src/shared/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListOrdersService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
  ) {}

  async list(): Promise<Order[]> {
    const orders = await this.orderRepository.query('SELECT * FROM orders');

    return orders;
  }
}
