import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { PasswordBcrypt } from 'src/infra/shared/crypto/bcrypt/password.bcrypt';
import { IPasswordCrypto } from 'src/infra/shared/crypto/password.crypto';
import { UserPrismaRepository } from '../../infra/database/prisma/repositories/user.prisma.repository';
import { IUserRepository } from '../users/repositories/user.repository';
import { AuthController } from './auth.controller';
import { SignInUseCase } from './use-cases/sign-in.usecase';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: new ConfigService().get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    SignInUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IPasswordCrypto,
      useClass: PasswordBcrypt,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
