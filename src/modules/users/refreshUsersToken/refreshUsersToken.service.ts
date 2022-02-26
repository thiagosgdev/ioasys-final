import { Injectable, Inject } from '@nestjs/common';
import { Decrypter } from 'src/shared/providers/EncryptProvider/protocols/decrypter';
import { Encrypter } from 'src/shared/providers/EncryptProvider/protocols/encrypter';
import { UserRepo } from 'src/shared/repositories/user.repository';

@Injectable()
export class RefreshUsersTokenService {
  constructor(
    private userRepository: UserRepo,
    @Inject('ENCRYPTER_PROVIDER')
    private encrypter: Encrypter,
    @Inject('ENCRYPTER_PROVIDER')
    private decrypter: Decrypter,
  ) {}

  async refresh(refresh_token: string): Promise<string> {
    const user_id = await this.decrypter.decrypt(refresh_token);
    if (!user_id) {
      return null;
    }
    const token = await this.encrypter.encrypt(user_id);
    await this.userRepository.update(user_id, { token });
    return token;
  }
}
