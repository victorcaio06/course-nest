import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { Public } from './decorators/public.decorator';
import { SingInSchema, SingInSchemaDTO } from './schemas/sign-in.schema';
import { SignInUseCase } from './use-cases/sign-in.usecase';

const schemaSingInSwagger = zodToOpenAPI(SingInSchema);

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @ApiBody({ schema: schemaSingInSwagger })
  @ApiResponse({ status: 200, description: 'Return access token' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: SingInSchemaDTO) {
    return await this.signInUseCase.execute(body);
  }
}
