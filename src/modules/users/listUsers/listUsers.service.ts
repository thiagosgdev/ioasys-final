import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Injectable()
export class ListUsersService {
  constructor(private repository: UserRepo) {}

  async list(): Promise<User[]> {
    return await this.repository.list();
  }
}
