import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import {
  UserCreatedDTO,
  UserToPrisma,
  UsernameAndEmail,
} from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  async save(data: UserToPrisma): Promise<UserCreatedDTO> {
    return await this.prismaService.users.create({
      data,
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
}
