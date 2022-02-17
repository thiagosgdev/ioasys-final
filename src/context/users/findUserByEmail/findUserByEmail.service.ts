import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByEmailService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
  }
}
