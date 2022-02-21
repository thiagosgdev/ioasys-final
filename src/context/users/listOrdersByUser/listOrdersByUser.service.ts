import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListOrdersByUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async list(id: string): Promise<User[]> {
    const userOrders = await this.userRepository.find({
      where: { id: id },
      relations: ['orders'],
    });

    return userOrders;
  }
}
