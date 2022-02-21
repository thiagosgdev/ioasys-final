import { sign, verify } from 'jsonwebtoken';
import envConfig from 'src/config/env';
import { Decrypter } from './protocols/decrypter';
import { Encrypter } from './protocols/encrypter';
import { EncrypterExpirationDate } from './protocols/encrypterExpirationDate';

export class JwtProvider
  implements Encrypter, Decrypter, EncrypterExpirationDate
{
  async encrypt(value: string): Promise<string> {
    const accessToken = sign({}, envConfig().jwtSecret, {
      subject: value,
    });
    return accessToken;
  }

  async decrypt(token: string): Promise<string> {
    const value = verify(token, envConfig().jwtSecret);
    return String(value);
  }

  async encryptExpDate(value: string): Promise<string> {
    const refreshToken = sign({}, envConfig().jwtSecret, {
      subject: value,
      expiresIn: envConfig().jwtExpires,
    });
    return refreshToken;
  }
}
