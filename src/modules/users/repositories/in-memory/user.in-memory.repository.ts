import { Users } from '@prisma/client';
import {
  UserToPrisma,
  UserCreatedDTO,
  UsernameAndEmail,
} from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInMemoryRepository implements IUserRepository {
  private users: UserCreatedDTO[] = [];

  async save(data: UserToPrisma): Promise<UserCreatedDTO> {
    const user: UserCreatedDTO = {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const userCreated = this.users.push(user);

    return this.users[userCreated - 1];
  }

  async findById(id: string): Promise<UserCreatedDTO | null> {
    throw new Error('Method not implemented.');
  }

  async findByUsername(username: string): Promise<UserCreatedDTO | null> {
    throw new Error('Method not implemented.');
  }

  async findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreatedDTO | null> {
    const userExists = this.users.find(
      (item) => data.username === item.username || data.email === item.email,
    );

    return userExists ?? null;
  }

  async updateAvatar(id: string, avatarUrl: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
