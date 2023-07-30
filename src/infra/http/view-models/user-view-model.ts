import { Users } from '@prisma/client';

export class UserViewModel {
  static toHttp({ id, name, username, email }: Users) {
    return {
      user: {
        id,
        name,
        username,
        email,
      },
    };
  }
}
