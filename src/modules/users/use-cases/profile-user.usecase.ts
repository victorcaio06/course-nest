import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { UserViewModel } from 'src/infra/http/view-models/user-view-model';

@Injectable()
export class ProfileUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found!');

    const userToDomain = UserViewModel.toHttp(user);

    return userToDomain;
  }
}
