import { Module } from '@nestjs/common';
import { NotificationRepostiroy } from 'src/application/repositories/notifications-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepostiroy,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepostiroy],
})
export class DatabaseModule {}
