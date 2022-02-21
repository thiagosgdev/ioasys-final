import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { Encrypter } from 'src/shared/providers/CriptographyProvider/protocols/encrypter';
import { EncrypterExpirationDate } from 'src/shared/providers/CriptographyProvider/protocols/encrypterExpirationDate';
import { Hasher } from 'src/shared/providers/EncryptProvider/protocols/hasher';
import { Repository } from 'typeorm';

@Injectable()
export class SigninUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
    @Inject('ENCRYPTER_PROVIDER')
    private encrypter: Encrypter,
    @Inject('ENCRYPTER_PROVIDER')
    private encrypterExpDate: EncrypterExpirationDate,
  ) {}

  async signin(email: string, password: string): Promise<any> {
    const user = await this.userRepository.query(
      `SELECT id, email, password FROM users WHERE email = $1`,
      [email],
    );

    if (!user[0].password) {
      user.password = String(Math.random() * 1000) + 'F4!L';
    }

    const isValid = await this.hasher.compareHash(password, user[0].password);

    console.log(`USER: ${user} ISVALID: ${isValid}`);

    if (!isValid) {
      throw new ConflictException('E-mail and/or password wrong!');
    }

    const token = await this.encrypter.encrypt(user[0].id);
    const refreshToken = await this.encrypterExpDate.encryptExpDate(user[0].id);

    await this.userRepository.update(
      { id: user[0].id },
      { token, refreshToken: refreshToken },
    );

    return { token, refreshToken };
  }
}
