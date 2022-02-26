import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Injectable()
export class FindUserByEmailService {
  constructor(private userRepository: UserRepo) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
