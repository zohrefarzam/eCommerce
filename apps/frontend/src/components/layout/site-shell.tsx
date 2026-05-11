/** Horizontal frame aligned with main sections (hero, grids, …). */
export const STOREFRONT_CONTENT_FRAME =
  "mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-24 xl:px-[160px]";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className={`${STOREFRONT_CONTENT_FRAME} flex-1 pb-14 pt-8`}>
        <div className="flex flex-col gap-8">{children}</div>
      </div>
    </div>
  );
}
