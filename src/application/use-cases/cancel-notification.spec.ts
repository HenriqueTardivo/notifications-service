import { makeNotification } from '@test//factiories/notification-factorie';
import { InMemoryNotificationRepostiroy } from '../../../test/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './error/notification-not-found';

describe('Cancel Notification', () => {
  it('should be albe to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepostiroy();

    const cancelNotifiction = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotifiction.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be albe to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepostiroy();

    const cancelNotifiction = new CancelNotification(notificationRepository);

    expect(async () => {
      await cancelNotifiction.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
