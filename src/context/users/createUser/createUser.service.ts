import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDTO } from 'src/shared/dto/createUser.dto';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);

    return user;
  }
}
