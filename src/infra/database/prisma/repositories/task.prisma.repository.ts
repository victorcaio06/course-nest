import {
  CreateTaskDTO,
  TaskUserNotificationDTO,
} from 'src/modules/tasks/dto/task.dto';
import { ITaskRepository } from 'src/modules/tasks/repositories/task.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from 'src/infra/utils/date';

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

  async findAllStartDay(): Promise<TaskUserNotificationDTO[] | null> {
    const startTime = Date.now();

    const allTasksOfDay = await this.prismaService.taskUser.findMany({
      where: {
        task: {
          AND: [
            { start_at: { gte: startOfDay() } },
            { end_at: { lte: endOfDay() } },
          ],
        },
      },
      include: {
        task: {
          select: {
            start_at: true,
            end_at: true,
            title: true,
            description: true,
          },
        },
        user: {
          select: {
            password: false,
            id: true,
            username: true,
            email: true,
            avatar_url: true,
            name: true,
            created_at: true,
          },
        },
      },
    });

    // const allTasksOfDay = await this.prismaService.tasks.findMany({
    //   where: { AND: [{ start_at: { gte: startOfDay(), lte: endOfDay() } }] },
    //   select: {
    //     title: true,
    //     start_at: true,
    //     end_at: true,
    //     description: true,
    //     user: { select: { user: true } },
    //   },
    // });

    const endTime = Date.now();

    console.log(
      '🚀 ~ file: task.prisma.repository.ts:68 ~ TaskPrismaRepository ~ findAllStartDay ~ Query time:',
      (startTime - endTime) / 1000,
    );

    return allTasksOfDay;
  }
}
