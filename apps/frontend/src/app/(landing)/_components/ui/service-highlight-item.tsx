import { Icon } from '@iconify/react';

type ServiceHighlightItemProps = {
  icon: string;
  title: string;
  description: string;
};

export function ServiceHighlightItem({
  icon,
  title,
  description,
}: ServiceHighlightItemProps) {
  return (
    <article className="flex flex-col items-center gap-3 text-center sm:gap-6">
      <div
        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-surface-tertiary sm:size-20"
        aria-hidden
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-foreground sm:size-14">
          <Icon
            icon={icon}
            className="size-5 text-background sm:size-[26px]"
            aria-hidden
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 sm:gap-2">
        <h3 className="text-sm font-bold tracking-wide text-foreground sm:text-lg">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted sm:text-sm">
          {description}
        </p>
      </div>
    </article>
  );
}
