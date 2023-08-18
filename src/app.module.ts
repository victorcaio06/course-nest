import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

import { DatabaseModule } from './infra/database/database.module';
import { ScheduleTaskModule } from './infra/jobs/schedule.module';
import { AuthModule } from './modules/auth/auth.module';
import { taskModule } from './modules/tasks/task.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    taskModule,
    AuthModule,
    ScheduleTaskModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
