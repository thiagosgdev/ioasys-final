import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { CreateUserDTO } from 'src/shared/dtos/createUser.dto';
import { User } from 'src/shared/entities/user.entity';
import { Hasher } from 'src/shared/providers/HasherProvider/protocols/hasher';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepo,
    private hasher: BcryptProvider,
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

    return user;
  }
}
