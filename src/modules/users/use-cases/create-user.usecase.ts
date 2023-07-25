import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private prismaService: PrismaService) {}

  async execute({ name, username, email, password }: CreateUserDTO) {
    const user = await this.prismaService.users.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (user) throw new Error('User already exists!');

    if (name === null || password === null) throw new Error('Invalid field!!');

    const userCreated = await this.prismaService.users.create({
      data: { name, email, password, username, id: randomUUID() },
    });

    return {
      name,
      username,
      email,
      password,
      id: userCreated.id,
    };
  }
}
