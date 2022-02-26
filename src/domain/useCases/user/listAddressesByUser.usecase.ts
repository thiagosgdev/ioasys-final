import { User } from 'src/shared/entities/user.entity';

export interface ListAddressesByUser {
  listAddresses(id: string): Promise<User>;
}
