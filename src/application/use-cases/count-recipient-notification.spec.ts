import { makeNotification } from '@test//factiories/notification-factorie';
import { InMemoryNotificationRepostiroy } from '../../../test/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipient Notification', () => {
  it('should be albe to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepostiroy();

    const countRecipientNotifications = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
