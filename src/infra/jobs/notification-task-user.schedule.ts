import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ITaskRepository } from 'src/modules/tasks/repositories/task.repository';

type MessageDTO = {
  name: string;
  email: string;
  title: string;
  description: string | null;
  start_at: Date | null;
  end_at: Date | null;
};

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    private taskRepository: ITaskRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getAllTaskDay() {
    const tasks = await this.taskRepository.findAllStartDay();

    if (tasks) {
      console.log('=== Enviando a notificação ===');

      tasks.forEach((task) => {
        const message: MessageDTO = {
          name: task.user.name,
          email: task.user.email,
          title: task.task.title,
          description: task.task.description,
          start_at: task.task.start_at,
          end_at: task.task.end_at,
        };

        this.notificationClient.emit('notification-task', message);
      });
    }
  }
}
