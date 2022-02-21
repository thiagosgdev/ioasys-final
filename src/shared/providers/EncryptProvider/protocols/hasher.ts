export interface Hasher {
  createHash(text: string): string;

  compareHash(payload: string, hashed: string): Promise<boolean>;
}
