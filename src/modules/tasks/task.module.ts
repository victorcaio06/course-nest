import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { CreateTaskUseCase } from './use-cases/create-task.usecase';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ITaskRepository } from './repositories/task.repository';
import { TaskPrismaRepository } from 'src/infra/database/prisma/repositories/task.prisma.repository';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    PrismaService,
    {
      provide: ITaskRepository,
      useClass: TaskPrismaRepository,
    },
  ],
})
export class taskModule {}
