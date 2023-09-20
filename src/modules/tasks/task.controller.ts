import { Body, Controller, Post, Request } from '@nestjs/common';

import { CreateTaskSchemaDTO } from './schemas/create-task.schema';
import { CreateTaskUseCase } from './use-cases/create-task.usecase';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('task')
export class TaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  async create(@Request() request, @Body() body: CreateTaskSchemaDTO) {
    const task = await this.createTaskUseCase.execute(body, request.user.sub);

    return task;
  }
}
