import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { Public } from '../auth/decorators/public.decorator';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { ProfileUserUseCase } from './use-cases/profile-user.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Public()
  @Post()
  // @UsePipes(new CreateUserValidationPipe())
  async create(@Body() body: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(body);
    const response = CreateUserResponseSchemaDTO.safeParse(user);

    if (!response.success) return response.error;

    return response.data;
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return await this.profileUserUseCase.execute(req.user.sub);

    // return req.user;
  }

  @Public()
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addUserAvatar(@UploadedFile() file: FileDTO) {
    console.log(file);
  }
}
