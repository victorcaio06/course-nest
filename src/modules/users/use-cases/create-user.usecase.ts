import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

import { CreateUserDTO } from '../dto/user.dto';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(private userRepository: IUserRepository) {}

  async execute({ name, username, email, password }: CreateUserDTO) {
    const user = await this.userRepository.findByUsernameOrEmail({
      username,
      email,
    });

    if (user) {
      this.logger.error(`User ${username} already exists...`);
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
    password = await bcrypt.hash(password, 6);

    const userCreated = await this.userRepository.save({
      id: randomUUID(),
      name,
      username,
      email,
      password,
    });

    return {
      ...userCreated,
    };
  }
}
