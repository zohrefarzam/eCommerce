type SectionHeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

export function SectionHeader({ title, actions }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
