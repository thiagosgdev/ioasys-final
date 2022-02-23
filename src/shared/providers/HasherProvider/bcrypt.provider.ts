import * as bcrypt from 'bcryptjs';
import { Hasher } from './protocols/hasher';

export class BcryptProvider implements Hasher {
  async createHash(text: string): Promise<string> {
    return await bcrypt.hash(text, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(payload, hashed);
  }
}
