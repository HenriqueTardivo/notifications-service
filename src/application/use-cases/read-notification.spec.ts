import { makeNotification } from '@test//factiories/notification-factorie';
import { InMemoryNotificationRepostiroy } from '../../../test/in-memory-notifications-repository';
import { NotificationNotFound } from './error/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be albe to Read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepostiroy();

    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be albe to Read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepostiroy();

    const readNotification = new ReadNotification(notificationRepository);

    expect(async () => {
      await readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
