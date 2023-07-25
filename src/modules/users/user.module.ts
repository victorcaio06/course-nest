import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
