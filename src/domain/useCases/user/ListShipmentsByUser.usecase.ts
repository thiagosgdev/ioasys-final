import { User } from 'src/shared/entities/user.entity';

export interface ListShipmentsByUser {
  listShipments(id: string): Promise<User>;
}
