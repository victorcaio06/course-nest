import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Client } from '@nestjs/microservices/external/nats-client.interface';
import { Public } from '../auth/decorators/public.decorator';

@Controller('notification')
export class NotificationController {
  constructor(
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) {}

  @Public()
  @Get('send-notification')
  testMsNotification() {
    this.notificationClient.emit('notification-task', 'Hello World!');
  }
}
