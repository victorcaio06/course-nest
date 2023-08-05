import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import {
  UserCreatedDTO,
  UserToPrisma,
  UsernameAndEmail,
} from '../../../../modules/users/dto/user.dto';
import { IUserRepository } from '../../../../modules/users/repositories/user.repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  async save(data: UserToPrisma): Promise<UserCreatedDTO> {
    return await this.prismaService.users.create({
      data,
    });
  }

  async findById(id: string): Promise<UserCreatedDTO | null> {
    return await this.prismaService.users.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<UserCreatedDTO | null> {
    return await this.prismaService.users.findFirst({
      where: { username },
    });
  }

  async findByUsernameOrEmail({
    username,
    email,
  }: UsernameAndEmail): Promise<UserCreatedDTO | null> {
    return await this.prismaService.users.findFirst({
      where: { OR: [{ username }, { email }] },
    });
  }

  async updateAvatar(id: string, avatarUrl: string): Promise<void> {
    await this.prismaService.users.update({
      where: { id },
      data: { avatar_url: avatarUrl },
    });
    return;
  }
}
