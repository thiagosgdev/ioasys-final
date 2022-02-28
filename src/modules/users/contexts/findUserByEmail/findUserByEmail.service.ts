import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/modules/users/repository/user.repository';

@Injectable()
export class FindUserByEmailService {
  constructor(private userRepository: UserRepo) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }
}
