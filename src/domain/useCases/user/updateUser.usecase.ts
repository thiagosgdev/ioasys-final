import { UpdateUserDTO } from 'src/shared/dtos/user/updateUser.dto';
import { User } from 'src/shared/entities/user.entity';

export interface UpdateUser {
  update(id: string, data: UpdateUserDTO): Promise<User>;
}
