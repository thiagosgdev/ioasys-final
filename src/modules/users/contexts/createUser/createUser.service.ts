import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { CreateUserDTO } from 'src/shared/dtos/user/createUser.dto';
import { User } from 'src/shared/entities/user.entity';
import { Hasher } from 'src/shared/providers/HasherProvider/protocols/hasher';
import { UserRepo } from 'src/modules/users/repository/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepo,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const savedUser = await this.userRepository.findByEmail(data.email);
    if (savedUser) {
      throw new ConflictException(
        'E-mail already in use! Try to recover your password',
      );
    }

    const hashedPassword = await this.hasher.createHash(data.password);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    if (user) {
      return user;
    }
    return null;
  }
}
