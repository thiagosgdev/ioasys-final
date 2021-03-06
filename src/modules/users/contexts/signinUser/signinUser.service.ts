import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { SigninResponseDTO } from 'src/shared/dtos/user/signinResponse.dto';
import { Encrypter } from 'src/shared/providers/EncryptProvider/protocols/encrypter';
import { EncrypterRefresh } from 'src/shared/providers/EncryptProvider/protocols/encrypterExpirationDate';
import { Hasher } from 'src/shared/providers/HasherProvider/protocols/hasher';
import { UserRepo } from 'src/modules/users/repository/user.repository';

@Injectable()
export class SigninUserService {
  constructor(
    private userRepository: UserRepo,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
    @Inject('ENCRYPTER_PROVIDER')
    private encrypter: Encrypter,
    @Inject('ENCRYPTER_PROVIDER')
    private encrypterRefresh: EncrypterRefresh,
  ) {}

  async signin(email: string, password: string): Promise<SigninResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      user.password = String(Math.random() * 1000) + 'F4!L';
    }

    const isValid = await this.hasher.compareHash(password, user.password);

    if (!isValid) {
      return null;
    }

    const token = await this.encrypter.encrypt(user.id);
    const refreshToken = await this.encrypterRefresh.encryptRefresh(user.id);

    await this.userRepository.update(user.id, {
      token,
      refresh_token: refreshToken,
    });

    return { token, refreshToken };
  }
}
