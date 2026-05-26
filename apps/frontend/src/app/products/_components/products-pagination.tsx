'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
  buildPageHref: (page: number) => string;
  prevLabel: string;
  nextLabel: string;
  pageLabel: (page: number) => string;
  ariaLabel: string;
  className?: string;
};

function pageRange(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
}

export function ProductsPagination({
  page,
  totalPages,
  buildPageHref,
  prevLabel,
  nextLabel,
  pageLabel,
  ariaLabel,
  className,
}: ProductsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = pageRange(page, totalPages);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'flex flex-wrap items-center justify-center gap-1 sm:gap-1.5',
        className,
      )}
    >
      {canPrev ? (
        <Link
          href={buildPageHref(page - 1)}
          prefetch={false}
          className="inline-flex items-center gap-1 rounded-lg border border-muted/20 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-foreground/5"
        >
          <Icon icon="lucide:chevron-left" width={16} height={16} aria-hidden />
          <span className="hidden sm:inline">{prevLabel}</span>
        </Link>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-muted/15 px-3 py-2 text-sm text-muted/60">
          <Icon icon="lucide:chevron-left" width={16} height={16} aria-hidden />
          <span className="hidden sm:inline">{prevLabel}</span>
        </span>
      )}

      <ol className="flex flex-wrap items-center gap-1">
        {pages.map((p, index) => {
          const prev = pages[index - 1];
          const showEllipsis = prev != null && p - prev > 1;
          return (
            <li key={p} className="flex items-center gap-1">
              {showEllipsis ? (
                <span className="px-1 text-muted" aria-hidden>
                  …
                </span>
              ) : null}
              {p === page ? (
                <span
                  className="inline-flex min-w-9 items-center justify-center rounded-lg bg-foreground px-3 py-2 text-sm font-semibold text-background"
                  aria-current="page"
                  aria-label={pageLabel(p)}
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={buildPageHref(p)}
                  prefetch={false}
                  aria-label={pageLabel(p)}
                  className="inline-flex min-w-9 items-center justify-center rounded-lg border border-muted/20 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-foreground/5"
                >
                  {p}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {canNext ? (
        <Link
          href={buildPageHref(page + 1)}
          prefetch={false}
          className="inline-flex items-center gap-1 rounded-lg border border-muted/20 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-foreground/5"
        >
          <span className="hidden sm:inline">{nextLabel}</span>
          <Icon
            icon="lucide:chevron-right"
            width={16}
            height={16}
            aria-hidden
          />
        </Link>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-muted/15 px-3 py-2 text-sm text-muted/60">
          <span className="hidden sm:inline">{nextLabel}</span>
          <Icon
            icon="lucide:chevron-right"
            width={16}
            height={16}
            aria-hidden
          />
        </span>
      )}
    </nav>
  );
}
