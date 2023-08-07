import { Injectable } from '@nestjs/common';
import { extname } from 'path';

import { AvatarDTO } from '../dto/user.dto';
import { IStorageRepository } from '../../../infra/providers/storage/storage.repository';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class UserAvatarUseCase {
  constructor(
    private userRepository: IUserRepository,
    private storageRepository: IStorageRepository,
  ) {}

  async execute({ idUser, file }: AvatarDTO) {
    const extFile = extname(file.originalname);
    const transformaName = `${idUser}${extFile}`;

    file.originalname = transformaName;
    const fileSaved = await this.storageRepository.upload(file, 'avatar');

    const avatarUrl = `avatar/${file.originalname}`;

    await this.userRepository.updateAvatar(idUser, avatarUrl);

    return fileSaved;
  }
}
