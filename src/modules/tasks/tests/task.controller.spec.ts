import { Test } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { CreateTaskUseCase } from '../use-cases/create-task.usecase';
import { ITaskRepository } from '../repositories/task.repository';
import { TaskPrismaRepository } from 'src/infra/database/prisma/repositories/task.prisma.repository';
import { CreateTaskSchemaDTO } from '../schemas/create-task.schema';

describe('Task Controller', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        CreateTaskUseCase,
        { provide: ITaskRepository, useClass: TaskPrismaRepository },
      ],
    }).compile();
    taskController = moduleRef.get<TaskController>(TaskController);
  });

  it('should be able to create a new task', async () => {
    const body: CreateTaskSchemaDTO = {
      title: 'test',
      description: 'test',
      priority: 'Alta',
      status: 'Pendente',
      start_at: new Date(),
      end_at: new Date('2023-08-010T00:00:00.000Z'),
    };

    const result = await taskController.create({}, body);

  });
});
