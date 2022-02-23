import { User } from 'src/shared/entities/user.entity';

export interface FindUserById {
  findById(id: string): Promise<User>;
}
