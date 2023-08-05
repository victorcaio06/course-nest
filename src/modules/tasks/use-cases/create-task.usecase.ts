import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ITaskRepository } from '../repositories/task.repository';
import { CreateTaskSchemaDTO } from '../schemas/create-task.schema';

@Injectable()
export class CreateTaskUseCase {
  private readonly logger = new Logger(CreateTaskUseCase.name);

  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    {
      title,
      description,
      priority,
      status,
      start_at,
      end_at,
    }: CreateTaskSchemaDTO,
    userId: string,
  ) {
    const titleExists = await this.taskRepository.findByTitle(title);

    if (titleExists) {
      this.logger.error(`Task title "${title}" already exists...`);

      throw new HttpException('Title already exists', HttpStatus.BAD_REQUEST);
    }
    console.log(userId);

    const taskCreated = await this.taskRepository.save({
      id: randomUUID(),
      title,
      description,
      priority,
      status,
      start_at,
      end_at,
      userId,
    });

    return { ...taskCreated };
  }
}
