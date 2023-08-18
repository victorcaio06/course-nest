import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';

import { ITaskRepository } from 'src/modules/tasks/repositories/task.repository';
import { TaskPrismaRepository } from '../database/prisma/repositories/task.prisma.repository';
import { NotificationTaskUserSchedule } from './notification-task-user.schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.TCP,
        options: {
          port: 3002,
          host: '127.0.0.1',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    NotificationTaskUserSchedule,
    {
      provide: ITaskRepository,
      useClass: TaskPrismaRepository,
    },
  ],
})
export class ScheduleTaskModule {}
