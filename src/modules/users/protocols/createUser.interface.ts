import { CreateUserDTO } from 'src/shared/dtos/user/createUser.dto';
import { User } from 'src/shared/entities/user.entity';

export interface CreateUserRepository {
  create(data: CreateUserDTO): Promise<User>;
}
