import { Address } from 'src/shared/entities/address.entity';

export interface ListAddressesByUserId {
  listByUser(user_id: string): Promise<Address[]>;
}
