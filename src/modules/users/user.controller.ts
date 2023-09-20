import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

import { Public } from '../auth/decorators/public.decorator';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchema,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { ProfileUserUseCase } from './use-cases/profile-user.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/user.dto';
import { UserAvatarUseCase } from './use-cases/user-avatar.usecase';

const schemaUserSwagger = zodToOpenAPI(CreateUserSchema);
const schemaUserSwaggerResponse = zodToOpenAPI(CreateUserResponseSchemaDTO);

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly userAvatarUseCase: UserAvatarUseCase,
  ) {}

  @ApiBody({ schema: schemaUserSwagger, description: 'User creation' })
  @ApiCreatedResponse({
    schema: schemaUserSwaggerResponse,
    description: 'User created successfully',
  })
  @ApiResponse({ description: 'User already exists!', status: 400 })
  @Public()
  @Post()
  // @UsePipes(new CreateUserValidationPipe())
  async create(@Body() body: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(body);
    const response = CreateUserResponseSchemaDTO.safeParse(user);

    if (!response.success) return response.error;

    return response.data;
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get user profile' })
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.profileUserUseCase.execute(req.user.sub);

    // return req.user;
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Add user avatar' })
  @Put('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addUserAvatar(@Request() request, @UploadedFile() file: FileDTO) {
    return await this.userAvatarUseCase.execute({
      idUser: request.user.sub,
      file,
    });
  }
}
