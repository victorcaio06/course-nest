import { Body, Controller, Post, Request } from '@nestjs/common';

import {
  CreateTaskSchema,
  CreateTaskSchemaDTO,
  ResponseTaskSchema,
} from './schemas/create-task.schema';
import { CreateTaskUseCase } from './use-cases/create-task.usecase';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

const schemaCreateTaskSwagger = zodToOpenAPI(CreateTaskSchema);
const schemaResponseCreateTaskSwagger = zodToOpenAPI(ResponseTaskSchema);

@ApiTags('tasks')
@Controller('task')
export class TaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @ApiBody({ schema: schemaCreateTaskSwagger, description: 'Task creation' })
  @ApiCreatedResponse({
    schema: schemaResponseCreateTaskSwagger,
    description: 'Task created',
  })
  @ApiBearerAuth()
  @Post()
  async create(@Request() request, @Body() body: CreateTaskSchemaDTO) {
    const task = await this.createTaskUseCase.execute(body, request.user.sub);

    return task;
  }
}
