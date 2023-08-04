import { CreateTaskDTO } from 'src/modules/tasks/dto/task.dto';
import { ITaskRepository } from 'src/modules/tasks/repositories/task.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskPrismaRepository implements ITaskRepository {
  constructor(private prismaService: PrismaService) {}

  async save({
    title,
    description,
    priority,
    status,
    start_at,
    end_at,
    userId,
    id,
  }: CreateTaskDTO): Promise<any> {
    console.log(userId);

    const taskCreated = await this.prismaService.taskUser.create({
      data: {
        task: {
          create: {
            title,
            description,
            priority,
            status,
            start_at,
            end_at,
            id,
          },
        },
        user: { connect: { id: userId } },
      },
      include: { task: true, user: true },
    });

    console.log('Retorno da tabela TASK_USER', taskCreated);

    return taskCreated;
  }

  async findByTitle(title: string): Promise<any> {
    return await this.prismaService.tasks.findUnique({
      where: { title },
    });
  }
}
