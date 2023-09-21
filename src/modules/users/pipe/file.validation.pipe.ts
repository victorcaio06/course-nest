import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { FileDTO } from '../dto/user.dto';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: FileDTO, metadata: ArgumentMetadata) {
    if (!file) throw new HttpException('Invalid file!', HttpStatus.BAD_REQUEST);

    return file;
  }
}
