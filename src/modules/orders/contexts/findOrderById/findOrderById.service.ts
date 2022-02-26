import { Injectable } from '@nestjs/common';
import { Order } from 'src/shared/entities/order.entity';
import { OrderRepo } from 'src/modules/orders/repository/order.repository';

@Injectable()
export class FindOrderByIdService {
  constructor(private orderRepository: OrderRepo) {}

  async find(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    return order;
  }
}
