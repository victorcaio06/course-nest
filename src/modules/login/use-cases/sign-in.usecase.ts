import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUserRepository } from 'src/modules/users/repositories/user.repository';
import { SignInDTO } from '../dto/sign.dto';
import { IPasswordCrypto } from 'src/infra/shared/crypto/password.crypto';

@Injectable()
export class SignInUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private jwtService: JwtService,
  ) {}

  async execute({ username, password }: SignInDTO) {
    const user = await this.userRepository.findByUsername(username);

    if (!user)
      throw new HttpException(
        'Username/password is invalid!',
        HttpStatus.BAD_REQUEST,
      );

    const doesPasswordMatches = await this.passwordCrypto.compare(
      password,
      user.password,
    );

    if (!doesPasswordMatches)
      throw new UnauthorizedException('Username/password is invalid!');

    const payload = { sub: user.id, username };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
