import { Injectable } from '@nestjs/common';
import { OrderRepo } from 'src/shared/repositories/order.repository';

@Injectable()
export class DeleteOrderService {
  constructor(private orderRepository: OrderRepo) {}

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
