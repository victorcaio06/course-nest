import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from './guards/auth.guard';
import { SignInDTO } from './dto/sign.dto';
import { SignInUseCase } from './use-cases/sign-in.usecase';
import { Public } from './decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: SignInDTO) {
    return await this.signInUseCase.execute(body);
  }
}
