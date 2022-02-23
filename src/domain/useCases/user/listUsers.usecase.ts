import { User } from 'src/shared/entities/user.entity';

export interface ListUsers {
  list(): Promise<User[]>;
}
