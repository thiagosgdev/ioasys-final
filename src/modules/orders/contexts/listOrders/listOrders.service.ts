import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Order } from 'src/shared/entities/order.entity';
import { OrderRepo } from 'src/modules/orders/repository/order.repository';

@Injectable()
export class ListOrdersService {
  constructor(private orderRepository: OrderRepo) {}

  async list(): Promise<Order[]> {
    const orders = await this.orderRepository.list();
    if (orders.length < 0) {
      throw new HttpException('Not order Found!', HttpStatus.NOT_FOUND);
    }
    return orders;
  }
}
