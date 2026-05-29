'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PROFILE_NAV } from '@/lib/profile-nav';
import { Button } from '@/components/base/button';
import { Popover } from '@/components/base/popover';
import { useLocale } from '@/i18n';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';

type AccountMenuItemProps = {
  href: string;
  icon: string;
  label: string;
  onNavigate?: () => void;
};

function AccountMenuItem({
  href,
  icon,
  label,
  onNavigate,
}: AccountMenuItemProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={onNavigate}
      className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-foreground transition hover:bg-surface-secondary"
    >
      <span className="flex min-w-0 items-center gap-3">
        <Icon
          icon={icon}
          width={20}
          height={20}
          className="shrink-0 text-muted"
          aria-hidden
        />
        <span>{label}</span>
      </span>
      <Icon
        icon="lucide:chevron-right"
        width={16}
        height={16}
        className="shrink-0 text-muted rtl:rotate-180"
        aria-hidden
      />
    </Link>
  );
}

export function AccountNav() {
  const router = useRouter();
  const { messages, config } = useLocale();
  const { user, isAuthenticated, isReady, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const labels = messages.account;

  if (!isReady) {
    return (
      <span
        className="inline-block h-9 w-24 animate-pulse rounded-lg bg-surface-secondary"
        aria-hidden
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        href="/login"
        variant="ghost"
        size="sm"
        className="h-auto min-h-0 px-2 py-1.5 text-xs font-semibold text-foreground sm:px-3 sm:text-sm"
      >
        {messages.header.signInSignUp}
      </Button>
    );
  }

  const closeMenu = () => setOpen(false);

  const handleSignOut = () => {
    signOut();
    closeMenu();
    router.refresh();
    router.push('/');
  };

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={messages.header.account}
        className={cn(
          'account-dropdown-trigger flex items-center gap-0.5 rounded-lg px-1.5 py-2 text-foreground transition outline-none',
          'hover:bg-surface-secondary',
          'focus:outline-none focus-visible:outline-none focus-visible:!ring-0',
          'data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-0',
        )}
      >
        <Icon
          icon="lucide:user"
          width={22}
          height={22}
          className="shrink-0"
          aria-hidden
        />
        <Icon
          icon="lucide:chevron-down"
          width={14}
          height={14}
          className="shrink-0 text-muted"
          aria-hidden
        />
      </Popover.Trigger>

      <Popover.Content
        placement={config.dir === 'rtl' ? 'bottom start' : 'bottom end'}
        offset={6}
        className={cn(
          'account-dropdown-popover w-[min(100vw-2rem,16rem)] overflow-hidden rounded-xl border border-muted/20 bg-surface p-0',
          'shadow-xl !outline-none !ring-0',
          'focus:outline-none focus-visible:!outline-none focus-visible:!ring-0',
          'data-[focus-visible=true]:!outline-none data-[focus-visible=true]:!ring-0',
        )}
      >
        <Popover.Dialog className="outline-none">
          <div className="border-b border-muted/15 px-4 py-3.5">
            <p className="truncate text-sm font-bold text-foreground">
              {user?.name}
            </p>
          </div>

          <nav className="flex flex-col py-1">
            {PROFILE_NAV.map((item) => (
              <AccountMenuItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={labels[item.labelKey]}
                onNavigate={closeMenu}
              />
            ))}
          </nav>

          <div className="border-t border-muted/15 py-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-foreground transition hover:bg-surface-secondary"
            >
              <Icon
                icon="lucide:log-out"
                width={20}
                height={20}
                className="shrink-0 text-muted"
                aria-hidden
              />
              <span>{labels.logout}</span>
            </button>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
