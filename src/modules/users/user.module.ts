import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from '../../infra/database/prisma/repositories/user.prisma.repository';
import { ProfileUserUseCase } from './use-cases/profile-user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ProfileUserUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
