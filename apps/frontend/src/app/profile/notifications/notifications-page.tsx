'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/base/button';
import { NotificationItem } from '@/components/ui/notification-item';
import { useLocale } from '@/i18n';
import {
  selectUnreadCount,
  useNotificationsStore,
} from '@/app/profile/_lib/notifications-store';
import { ProfileContentCard } from '../_components/profile-shell';

export function ProfileNotificationsPage() {
  const { messages } = useLocale();
  const labels = messages.notifications;
  const items = useNotificationsStore((state) => state.items);
  const markAsRead = useNotificationsStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);
  const unreadCount = useNotificationsStore(selectUnreadCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showEmpty = mounted && items.length === 0;
  const showList = mounted && items.length > 0;

  return (
    <ProfileContentCard
      title={labels.pageTitle}
      headerEnd={
        mounted && unreadCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto min-h-0 px-2 py-1 text-xs font-semibold text-muted sm:text-sm"
            onPress={markAllAsRead}
          >
            {labels.markAllRead}
          </Button>
        ) : null
      }
    >
      {!mounted ? (
        <div className="flex justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      ) : null}

      {showEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-surface-secondary text-muted">
            <Icon icon="lucide:bell" width={40} height={40} aria-hidden />
          </div>
          <p className="mt-6 max-w-sm text-sm text-muted">{labels.empty}</p>
        </div>
      ) : null}

      {showList ? (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-xl border border-muted/15"
            >
              <NotificationItem
                notification={item}
                variant="page"
                onMarkRead={markAsRead}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </ProfileContentCard>
  );
}
