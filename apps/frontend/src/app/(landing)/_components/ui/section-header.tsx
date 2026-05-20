type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  actions?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, actions }: SectionHeaderProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:gap-4">
      <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
        {eyebrow ? (
          <p className="text-xs font-medium text-muted sm:text-sm">{eyebrow}</p>
        ) : null}
        <h2 className="text-lg font-bold text-foreground sm:text-xl md:text-2xl">
          {title}
        </h2>
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
