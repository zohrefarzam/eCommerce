import Link from 'next/link';
import { Icon } from '@iconify/react';

type CategoryCardProps = {
  href: string;
  label: string;
  icon: string;
};

export function CategoryCard({ href, label, icon }: CategoryCardProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex min-w-[140px] flex-1 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl bg-surface-secondary px-4 py-6 text-center text-sm font-medium text-foreground transition hover:bg-surface-tertiary sm:min-w-0"
    >
      <Icon
        icon={icon}
        width={32}
        height={32}
        className="text-foreground transition-transform duration-200 group-hover:scale-110"
        aria-hidden
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}
