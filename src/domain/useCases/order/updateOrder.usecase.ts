import { UpdateOrderDTO } from 'src/shared/dtos/order/updateOrder.dto';
import { Order } from 'src/shared/entities/order.entity';

export interface UpdateOrder {
  update(data: UpdateOrderDTO): Promise<Order>;
}
