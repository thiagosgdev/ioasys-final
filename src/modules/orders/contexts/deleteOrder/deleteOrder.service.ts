import { Injectable } from '@nestjs/common';
import { OrderRepo } from 'src/modules/orders/repository/order.repository';

@Injectable()
export class DeleteOrderService {
  constructor(private orderRepository: OrderRepo) {}

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
