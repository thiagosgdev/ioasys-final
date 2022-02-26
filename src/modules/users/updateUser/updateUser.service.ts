import { Injectable, Inject } from '@nestjs/common';
import { UpdateUserDTO } from 'src/shared/dtos/updateUser.dto';
import { User } from 'src/shared/entities/user.entity';
import { Hasher } from 'src/shared/providers/HasherProvider/protocols/hasher';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(
    private userRepository: UserRepo,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
  ) {}

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    if (data.password) {
      const hashedPassword = await this.hasher.createHash(data.password);
      data.password = hashedPassword;
    }
    const user = await this.userRepository.update(id, data);
    return user;
  }
}
