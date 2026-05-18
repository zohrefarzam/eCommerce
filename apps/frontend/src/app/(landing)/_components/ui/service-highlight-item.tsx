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
    <article className="flex flex-col items-center gap-6 text-center">
      <div
        className="flex size-20 shrink-0 items-center justify-center rounded-full bg-surface-secondary"
        aria-hidden
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-foreground">
          <Icon
            icon={icon}
            width={26}
            height={26}
            className="text-background"
            aria-hidden
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold tracking-wide text-foreground sm:text-lg">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </article>
  );
}
