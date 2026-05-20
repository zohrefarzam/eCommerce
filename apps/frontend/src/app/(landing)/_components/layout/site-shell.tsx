import { Children, Fragment } from 'react';
import { SectionDivider } from '@/landing/_components/ui/section-divider';
import { STOREFRONT_CONTENT_FRAME } from '@/lib/storefront-layout';

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const sections = Children.toArray(children).filter(Boolean);

  return (
    <div className="flex flex-1 flex-col">
      <div
        className={`${STOREFRONT_CONTENT_FRAME} flex-1 pb-10 pt-8 sm:pb-14 sm:pt-16 lg:pt-24`}
      >
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
