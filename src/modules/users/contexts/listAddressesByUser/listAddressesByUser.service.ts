import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { UserRepo } from 'src/modules/users/repository/user.repository';

@Injectable()
export class ListAddressesByUserService {
  constructor(private userRepository: UserRepo) {}

  async list(id: string): Promise<User> {
    const userAddreses = await this.userRepository.listAddresses(id);
    return userAddreses;
  }
}
