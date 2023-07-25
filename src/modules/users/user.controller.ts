import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    try {
      return await this.createUserUseCase.execute(body);
    } catch (error) {
      if (error.message === 'Invalid fields!')
        throw new HttpException('Invalid fields!', HttpStatus.BAD_REQUEST);
    }
  }
}
