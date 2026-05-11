import Link from "next/link";

type CategoryCardProps = {
  href: string;
  label: string;
};

export function CategoryCard({ href, label }: CategoryCardProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="flex min-w-[120px] flex-1 flex-col items-center gap-3 rounded-2xl bg-surface-secondary px-4 py-6 text-center text-sm font-medium text-foreground transition hover:bg-surface-tertiary sm:min-w-[140px]"
    >
      <span
        className="flex size-12 items-center justify-center rounded-xl bg-surface-tertiary"
        aria-hidden
      />
      {label}
    </Link>
  );
}
