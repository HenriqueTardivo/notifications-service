import { Notification } from '../src/application/entities/notification';
import { NotificationRepostiroy } from '../src/application/repositories/notifications-repository';

export class InMemoryNotificationRepostiroy implements NotificationRepostiroy {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
