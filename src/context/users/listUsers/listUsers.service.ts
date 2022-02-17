import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListUsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return this.userRepository.query('SELECT * FROM users');
  }
}
