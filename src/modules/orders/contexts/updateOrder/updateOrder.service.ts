import { Injectable } from '@nestjs/common';
import { Order } from 'src/shared/entities/order.entity';
import { OrderRepo } from 'src/modules/orders/repository/order.repository';
import { UpdateOrderDTO } from 'src/shared/dtos/order/updateOrder.dto';

@Injectable()
export class UpdateOrderService {
  constructor(private readonly orderRepository: OrderRepo) {}

  async update(data: UpdateOrderDTO): Promise<Order> {
    const order = await this.orderRepository.update(data);
    if (!order) {
      return null;
    }

    return order;
  }
}
