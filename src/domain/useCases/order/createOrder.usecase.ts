import { CreateOrderDTO } from 'src/shared/dtos/createOrder.dto';
import { Order } from 'src/shared/entities/order.entity';

export interface CreateOrder {
  create(data: CreateOrderDTO): Promise<Order>;
}
