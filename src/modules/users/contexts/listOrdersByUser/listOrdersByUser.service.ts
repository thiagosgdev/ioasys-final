import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/modules/users/repository/user.repository';

@Injectable()
export class ListOrdersByUserService {
  constructor(private userRepository: UserRepo) {}

  async list(id: string): Promise<User[]> {
    const userOrders = await this.userRepository.listOrders(id);

    return userOrders;
  }
}
