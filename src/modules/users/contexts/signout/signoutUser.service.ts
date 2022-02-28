import { Injectable } from '@nestjs/common';
import { UserRepo } from 'src/modules/users/repository/user.repository';

@Injectable()
export class SignoutUserService {
  constructor(private userRepository: UserRepo) {}

  async signout(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return false;
    }
    const token = null;
    const refreshToken = null;

    await this.userRepository.update(user.id, {
      token,
      refresh_token: refreshToken,
    });
    return true;
  }
}
