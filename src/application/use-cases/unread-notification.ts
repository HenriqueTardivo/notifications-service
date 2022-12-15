import { Injectable } from '@nestjs/common';
import { NotificationRepostiroy } from '../repositories/notifications-repository';
import { NotificationNotFound } from './error/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepostiroy) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unRead();

    await this.notificationRepository.save(notification);
  }
}
