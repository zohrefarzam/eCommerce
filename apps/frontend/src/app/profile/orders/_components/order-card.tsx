'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { Image } from '@/components/base/image';
import type { Messages } from '@/i18n/messages';
import type { Locale } from '@/i18n/config';
import { formatCartMoney } from '@/app/cart/_lib/cart-utils';
import type { ProfileOrder } from '@/app/profile/_lib/profile-orders-data';
import { cn } from '@/components/base/_lib/utils';

type OrderCardProps = {
  order: ProfileOrder;
  locale: Locale;
  labels: Messages['account'];
};

const statusIcon: Record<
  ProfileOrder['status'],
  { icon: string; className: string }
> = {
  delivered: { icon: 'lucide:circle-check', className: 'text-foreground' },
  current: { icon: 'lucide:package', className: 'text-foreground' },
  returned: { icon: 'lucide:rotate-ccw', className: 'text-muted' },
  cancelled: { icon: 'lucide:circle-x', className: 'text-muted' },
};

const statusLabels: Record<
  ProfileOrder['status'],
  keyof Pick<
    Messages['account'],
    | 'orderStatusCurrent'
    | 'orderStatusDelivered'
    | 'orderStatusReturned'
    | 'orderStatusCancelled'
  >
> = {
  current: 'orderStatusCurrent',
  delivered: 'orderStatusDelivered',
  returned: 'orderStatusReturned',
  cancelled: 'orderStatusCancelled',
};

export function OrderCard({ order, locale, labels }: OrderCardProps) {
  const statusLabel = labels[statusLabels[order.status]];
  const statusStyle = statusIcon[order.status];

  return (
    <article className="overflow-hidden rounded-xl border border-muted/20 bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-muted/15 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <Icon
            icon={statusStyle.icon}
            width={18}
            height={18}
            className={cn('shrink-0', statusStyle.className)}
            aria-hidden
          />
          <span className="text-sm font-semibold text-foreground">
            {statusLabel}
          </span>
        </div>
        <Icon
          icon="lucide:chevron-left"
          width={18}
          height={18}
          className="shrink-0 text-muted rtl:rotate-180"
          aria-hidden
        />
      </div>

      <div className="space-y-3 px-4 py-4 sm:px-5">
        <p className="text-sm text-muted">
          <span>{order.dateLabel}</span>
          <span className="mx-2 text-muted/50" aria-hidden>
            ·
          </span>
          <span>{labels.orderNumber(order.id)}</span>
          <span className="mx-2 text-muted/50" aria-hidden>
            ·
          </span>
          <span className="font-medium text-foreground">
            {formatCartMoney(order.total, locale)}
          </span>
        </p>

        {order.clubPoints ? (
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <Icon
              icon="lucide:coins"
              width={14}
              height={14}
              className="shrink-0 text-foreground"
              aria-hidden
            />
            {labels.orderClubPoints(order.clubPoints)}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {order.items.map((item, index) => (
            <div
              key={`${order.id}-${index}`}
              className="relative size-14 overflow-hidden rounded-lg border border-muted/15 bg-surface sm:size-16"
            >
              <Image src={item.image} alt={item.alt} sizes="64px" fit="cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-muted/15 px-4 py-3 sm:px-5">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto min-h-0 gap-1.5 px-0 py-0 text-sm font-medium text-foreground"
        >
          <Icon icon="lucide:file-text" width={16} height={16} aria-hidden />
          {labels.viewInvoice}
        </Button>
      </div>
    </article>
  );
}
