import { Children, Fragment } from 'react';
import { SectionDivider } from '@/landing/_components/ui/section-divider';

/** Horizontal frame aligned with main sections (hero, grids, …). */
export const STOREFRONT_CONTENT_FRAME =
  'mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-24 xl:px-[160px]';

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const sections = Children.toArray(children).filter(Boolean);

  return (
    <div className="flex flex-1 flex-col">
      <div className={`${STOREFRONT_CONTENT_FRAME} flex-1 pb-14 pt-24`}>
        <div className="flex flex-col">
          {sections.map((section, index) => (
            <Fragment key={index}>
              {index > 0 && <SectionDivider />}
              {section}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
