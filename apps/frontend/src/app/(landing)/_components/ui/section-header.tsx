type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  actions?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, actions }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full">
      <div className="flex flex-col gap-1">
        {eyebrow ? (
          <p className="text-sm font-medium text-muted">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
