import { Body, Controller, Post } from '@nestjs/common';

import { SignInDTO } from './dto/sign.dto';
import { SignInUseCase } from './use-cases/sign-in.usecase';

@Controller('login')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post()
  async signIn(@Body() body: SignInDTO) {
    return await this.signInUseCase.execute(body);
  }
}
