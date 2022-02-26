import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Injectable()
export class ListShipmentByUserService {
  constructor(private userRepository: UserRepo) {}

  async list(id: string): Promise<User> {
    const userShipments = await this.userRepository.listShipments(id);
    return userShipments;
  }
}
