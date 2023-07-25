import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase, PrismaService],
})
export class UserModule {}
