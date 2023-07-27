import * as bcrypt from 'bcrypt';

import { IPasswordCrypto } from '../password.crypto';

export class PasswordBcrypt implements IPasswordCrypto {
  async hash(password: string): Promise<string> {
    password = await bcrypt.hash(password, 6);

    return password;
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    const doesPasswordMatches = await bcrypt.compare(password, passwordHash);

    return doesPasswordMatches;
  }
}
