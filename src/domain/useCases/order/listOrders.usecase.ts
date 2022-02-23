import { Order } from 'src/shared/entities/order.entity';

export interface ListOrders {
  list(): Promise<Order[]>;
}
