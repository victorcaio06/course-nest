import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(
    { name, username, email, password }: CreateUserDTO,
    metadata: ArgumentMetadata,
  ) {
    if (!name || !username || !email || !password) {
      throw new HttpException(
        'Invalid fields!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return { name, username, email, password };
  }
}
