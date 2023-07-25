import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await this.createUserUseCase.execute(body);
  }
}
