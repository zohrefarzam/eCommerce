'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { cn } from '@/components/base/_lib/utils';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type ProductsBreadcrumbProps = {
  items: BreadcrumbItem[];
  ariaLabel: string;
  className?: string;
};

export function ProductsBreadcrumb({
  items,
  ariaLabel,
  className,
}: ProductsBreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel} className={cn('min-w-0', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-1"
            >
              {index > 0 ? (
                <Icon
                  icon="lucide:chevron-right"
                  width={14}
                  height={14}
                  className="shrink-0 text-muted/70 rtl:rotate-180"
                  aria-hidden
                />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  prefetch={false}
                  className="truncate transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'truncate',
                    isLast ? 'font-semibold text-foreground' : '',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
