'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/base/button';
import { Popover } from '@/components/base/popover';
import { NotificationItem } from '@/components/ui/notification-item';
import { useLocale } from '@/i18n';
import {
  selectUnreadCount,
  useNotificationsStore,
} from '@/app/profile/_lib/notifications-store';
import { cn } from '@/components/base/_lib/utils';

const DROPDOWN_LIMIT = 5;

export function NotificationsNavDropdown() {
  const { messages, config } = useLocale();
  const { header, notifications: notificationMessages } = messages;
  const items = useNotificationsStore((state) => state.items);
  const markAsRead = useNotificationsStore((state) => state.markAsRead);
  const unreadCount = useNotificationsStore(selectUnreadCount);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const recentItems = items.slice(0, DROPDOWN_LIMIT);
  const notificationLabel =
    mounted && unreadCount > 0
      ? `${header.notifications} (${unreadCount})`
      : header.notifications;

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={notificationLabel}
        className={cn(
          'notifications-dropdown-trigger relative rounded-lg p-2 text-foreground transition outline-none',
          'hover:bg-surface-secondary',
          'focus:outline-none focus-visible:outline-none focus-visible:!ring-0',
          'data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-0',
        )}
      >
        <Icon
          icon="lucide:bell"
          width={22}
          height={22}
          className="shrink-0"
          aria-hidden
        />
        {mounted && unreadCount > 0 ? (
          <span
            className={cn(
              'absolute -end-0.5 -top-0.5 flex min-w-4 items-center justify-center',
              'rounded-full bg-foreground px-1 py-0.5 text-[10px] font-bold leading-none text-background',
            )}
            aria-hidden
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        ) : null}
      </Popover.Trigger>

      <Popover.Content
        placement={config.dir === 'rtl' ? 'bottom start' : 'bottom end'}
        offset={6}
        className={cn(
          'notifications-dropdown-popover w-[min(100vw-2rem,24rem)] overflow-hidden rounded-xl border border-muted/20 bg-background p-0 sm:w-[26rem]',
          'shadow-xl !outline-none !ring-0',
          'focus:outline-none focus-visible:!outline-none focus-visible:!ring-0',
          'data-[focus-visible=true]:!outline-none data-[focus-visible=true]:!ring-0',
        )}
      >
        <Popover.Dialog className="outline-none">
          <div className="flex max-h-[min(70vh,28rem)] flex-col">
            <div className="border-b border-muted/15 px-5 py-4">
              <p className="text-sm font-bold text-foreground">
                {notificationMessages.dropdownTitle}
                {mounted && unreadCount > 0 ? (
                  <span className="ms-1.5 font-medium text-muted">
                    ({unreadCount})
                  </span>
                ) : null}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {!mounted ? (
                <div className="flex justify-center py-10">
                  <div className="size-6 animate-pulse rounded-full bg-surface-secondary" />
                </div>
              ) : recentItems.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-muted">
                  {notificationMessages.empty}
                </p>
              ) : (
                <div className="divide-y divide-muted/10">
                  {recentItems.map((item) => (
                    <NotificationItem
                      key={item.id}
                      notification={item}
                      variant="dropdown"
                      onMarkRead={markAsRead}
                      onNavigate={() => setOpen(false)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-muted/15 px-5 py-4">
              <Button
                variant="primary"
                fullWidth
                className="h-10 rounded-xl !bg-foreground !text-background font-semibold"
                href="/profile/notifications"
                onPress={() => setOpen(false)}
              >
                {notificationMessages.viewAll}
              </Button>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
