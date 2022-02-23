import { Order } from 'src/shared/entities/order.entity';

export interface FindOrderById {
  findById(id: string): Promise<Order>;
}
