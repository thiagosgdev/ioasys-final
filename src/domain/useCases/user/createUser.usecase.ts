import { CreateUserDTO } from 'src/shared/dtos/user/createUser.dto';
import { User } from 'src/shared/entities/user.entity';

export interface CreateUser {
  create(data: CreateUserDTO): Promise<User>;
}
