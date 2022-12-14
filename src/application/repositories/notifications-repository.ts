import { Notification } from '../entities/notification';

export abstract class NotificationRepostiroy {
  abstract create(notification: Notification): Promise<void>;
}
