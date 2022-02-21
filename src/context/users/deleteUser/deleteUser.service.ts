import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async delete(id: string) {
    await this.userRepository.softDelete(id);
  }
}
