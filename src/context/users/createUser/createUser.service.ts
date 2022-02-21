import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { CreateUserDTO } from 'src/shared/dto/createUser.dto';
import { User } from 'src/shared/entities/user.entity';
import { Hasher } from 'src/shared/providers/EncryptProvider/protocols/hasher';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const savedUser = await this.userRepository.query(
      `SELECT first_name FROM users WHERE email = $1`,
      [data.email],
    );
    if (savedUser.length > 0) {
      throw new ConflictException(
        'E-mail already in use! Try to recover your password',
      );
    }

    const hashedPassword = this.hasher.createHash(data.password);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return user;
  }
}
