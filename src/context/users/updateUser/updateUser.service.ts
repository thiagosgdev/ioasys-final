import { Injectable, Inject } from '@nestjs/common';
import { UpdateUserDTO } from 'src/shared/dto/updateUser.dto';
import { User } from 'src/shared/entities/user.entity';
import { Hasher } from 'src/shared/providers/EncryptProvider/protocols/hasher';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
  ) {}

  async update(data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.query(
      `SELECT * FROM users WHERE id= $1`,
      [data.id],
    );
    if (data.password) {
      const hashedPassword = this.hasher.createHash(data.password);
      data.password = hashedPassword;
    }
    return await this.userRepository.save({
      ...user,
      ...data,
    });
  }
}
