import { User } from 'src/shared/entities/user.entity';

export interface ListOrdersByUser {
  listOrders(id: string): Promise<User[]>;
}
