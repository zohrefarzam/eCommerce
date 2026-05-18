'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Input } from '@/components/baseComponents/input';

const iconMuted = 'text-muted shrink-0';
const iconNav = 'shrink-0';

export function MarketingHeader() {
  return (
    <header className="w-full bg-background py-4">
      <div className="flex w-full flex-col gap-3 px-[105px] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex justify-center items-center w-full max-w-xl gap-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
            prefetch={false}
          >
            هوشمندسازان
          </Link>

          <Input
            type="search"
            placeholder="جستجو"
            aria-label="جستجو"
            startContent={
              <Icon
                icon="lucide:search"
                width={18}
                height={18}
                className={iconMuted}
                aria-hidden
              />
            }
          />
        </div>

        <div className="flex items-center gap-3 text-foreground">
          <IconButton label="علاقه‌مندی‌ها">
            <Icon
              icon="lucide:bell"
              width={22}
              height={22}
              className={iconNav}
              aria-hidden
            />
          </IconButton>
          <IconButton label="سبد خرید">
            <Icon
              icon="lucide:shopping-cart"
              width={22}
              height={22}
              className={iconNav}
              aria-hidden
            />
          </IconButton>
          <IconButton label="حساب کاربری">
            <Icon
              icon="lucide:user"
              width={22}
              height={22}
              className={iconNav}
              aria-hidden
            />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="rounded-lg p-2 text-foreground transition hover:bg-surface-secondary"
    >
      {children}
    </button>
  );
}
