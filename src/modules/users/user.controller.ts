import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/user.dto';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { Public } from '../auth/decorators/public.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Public()
  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() body: CreateUserDTO) {
    return await this.createUserUseCase.execute(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
