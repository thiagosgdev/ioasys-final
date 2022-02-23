import { User } from 'src/shared/entities/user.entity';

export interface FindUserByEmail {
  findByEmail(email: string): Promise<User>;
}
