import { UpdateUserDTO } from 'src/shared/dtos/updateUser.dto';
import { User } from 'src/shared/entities/user.entity';

export interface UpdateUser {
  update(data: UpdateUserDTO): Promise<User>;
}
