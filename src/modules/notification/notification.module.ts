import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
  controllers: [NotificationController],
  providers: [],
})
export class NotificationModule {}
