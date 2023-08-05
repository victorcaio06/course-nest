import { FileDTO } from 'src/modules/users/dto/user.dto';

export abstract class IStorageRepository {
  abstract upload(file: FileDTO, folder: string): Promise<any>;
}
