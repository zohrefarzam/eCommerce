'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useLocale } from '@/i18n';
import {
  formatNotificationTime,
  getNotificationContent,
} from '@/app/profile/_lib/notification-content';
import type { Notification } from '@/app/profile/_lib/notifications-store';
import { cn } from '@/components/base/_lib/utils';

type NotificationItemProps = {
  notification: Notification;
  variant?: 'dropdown' | 'page';
  onNavigate?: () => void;
  onMarkRead?: (id: string) => void;
};

export function NotificationItem({
  notification,
  variant = 'page',
  onNavigate,
  onMarkRead,
}: NotificationItemProps) {
  const { messages, locale } = useLocale();
  const content = getNotificationContent(notification, messages);
  const timeLabel = formatNotificationTime(
    notification.createdAt,
    locale,
    messages,
  );

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead?.(notification.id);
    }
    onNavigate?.();
  };

  return (
    <Link
      href={content.href}
      prefetch={false}
      onClick={handleClick}
      className={cn(
        'group flex gap-3 transition hover:bg-surface-secondary/80',
        variant === 'dropdown' ? 'px-5 py-3.5' : 'rounded-xl px-4 py-4',
        !notification.read && 'bg-surface-secondary/40',
      )}
    >
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full',
          notification.type === 'order_placed'
            ? 'bg-emerald-500/10 text-emerald-600'
            : 'bg-blue-500/10 text-blue-600',
        )}
      >
        <Icon
          icon={
            notification.type === 'order_placed'
              ? 'lucide:shopping-bag'
              : 'lucide:package-check'
          }
          width={18}
          height={18}
          aria-hidden
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-2">
          <span className="text-sm font-semibold text-foreground">
            {content.title}
          </span>
          {!notification.read ? (
            <span
              className="mt-1.5 size-2 shrink-0 rounded-full bg-foreground"
              aria-hidden
            />
          ) : null}
        </span>
        <span className="mt-0.5 block text-sm text-muted">{content.body}</span>
        <span className="mt-1 block text-xs text-muted">{timeLabel}</span>
      </span>
    </Link>
  );
}
