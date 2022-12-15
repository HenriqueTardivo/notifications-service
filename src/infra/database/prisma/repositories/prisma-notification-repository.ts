import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepostiroy } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMappper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepostiroy {
  constructor(private prisma: PrismaService) {}

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMappper.toDomain);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMappper.toDomain(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMappper.toPrisma(notification);

    await this.prisma.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMappper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }
}
