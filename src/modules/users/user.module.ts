import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from '../../infra/database/prisma/repositories/user.prisma.repository';
import { ProfileUserUseCase } from './use-cases/profile-user.usecase';
import { UserAvatarUseCase } from './use-cases/user-avatar.usecase';
import { IStorageRepository } from 'src/infra/providers/storage/storage.repository';
import { StorageSupabaseRepository } from 'src/infra/providers/storage/supabase/storage.supabase.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ProfileUserUseCase,
    UserAvatarUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorageRepository,
      useClass: StorageSupabaseRepository,
    },
  ],
})
export class UserModule {}
