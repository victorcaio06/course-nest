import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() body: CreateUserDTO) {
    return await this.createUserUseCase.execute(body);
  }
}
