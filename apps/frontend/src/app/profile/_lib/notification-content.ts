import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import type { OrderStatus } from '@/app/profile/_lib/profile-orders-data';
import type { Notification } from '@/app/profile/_lib/notifications-store';

const STATUS_LABEL_KEYS: Record<
  OrderStatus,
  | 'orderStatusCurrent'
  | 'orderStatusDelivered'
  | 'orderStatusReturned'
  | 'orderStatusCancelled'
> = {
  current: 'orderStatusCurrent',
  delivered: 'orderStatusDelivered',
  returned: 'orderStatusReturned',
  cancelled: 'orderStatusCancelled',
};

export type NotificationContent = {
  title: string;
  body: string;
  href: string;
};

export function getNotificationContent(
  notification: Notification,
  messages: Messages,
): NotificationContent {
  const href = '/profile/orders';

  if (notification.type === 'order_placed') {
    return {
      title: messages.notifications.orderPlacedTitle,
      body: messages.notifications.orderPlacedBody(notification.orderId),
      href,
    };
  }

  const statusLabel = messages.account[STATUS_LABEL_KEYS[notification.status]];

  return {
    title: messages.notifications.orderStatusTitle,
    body: messages.notifications.orderStatusBody(
      notification.orderId,
      statusLabel,
    ),
    href,
  };
}

export function formatNotificationTime(
  createdAt: number,
  locale: Locale,
  messages: Messages,
): string {
  const diffMs = Date.now() - createdAt;
  const diffMinutes = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMinutes < 1) {
    return messages.notifications.timeJustNow;
  }

  if (diffMinutes < 60) {
    return messages.notifications.timeMinutes(diffMinutes);
  }

  if (diffHours < 24) {
    return messages.notifications.timeHours(diffHours);
  }

  if (diffDays < 7) {
    return messages.notifications.timeDays(diffDays);
  }

  const date = new Date(createdAt);
  if (locale === 'fa') {
    return date.toLocaleDateString('fa-IR');
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
