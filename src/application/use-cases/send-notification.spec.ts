import { InMemoryNotificationRepostiroy } from '../../../test/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be albe to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepostiroy();

    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'Notificação teste',
      category: 'Social',
      recipientId: 'example-id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
