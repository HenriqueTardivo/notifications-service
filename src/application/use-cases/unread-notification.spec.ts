import { makeNotification } from '@test//factiories/notification-factorie';
import { InMemoryNotificationRepostiroy } from '../../../test/in-memory-notifications-repository';
import { NotificationNotFound } from './error/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Read Notification', () => {
  it('should be albe to Read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepostiroy();

    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be albe to Read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepostiroy();

    const readNotification = new UnreadNotification(notificationRepository);

    expect(async () => {
      await readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
