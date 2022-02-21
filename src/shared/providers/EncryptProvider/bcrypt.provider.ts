import * as bcrypt from 'bcryptjs';
import { Hasher } from './protocols/hasher';

export class BcryptProvider implements Hasher {
  createHash(text: string): string {
    return bcrypt.hashSync(text);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
