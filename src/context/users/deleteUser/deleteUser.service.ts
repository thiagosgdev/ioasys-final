import { Injectable } from '@nestjs/common';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Injectable()
export class DeleteUserService {
  constructor(private userRepository: UserRepo) {}

  async delete(id: string) {
    await this.userRepository.delete(id);
  }
}
