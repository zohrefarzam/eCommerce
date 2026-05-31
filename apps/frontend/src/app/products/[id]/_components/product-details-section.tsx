'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import type { ProductDetailSection } from '@/app/products/_lib/product-detail';

type ProductDetailsSectionProps = {
  title: string;
  intro: string;
  sections: readonly ProductDetailSection[];
  moreSections: readonly ProductDetailSection[];
  viewMoreLabel: string;
  viewLessLabel: string;
};

export function ProductDetailsSection({
  title,
  intro,
  sections,
  moreSections,
  viewMoreLabel,
  viewLessLabel,
}: ProductDetailsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleSections = expanded ? [...sections, ...moreSections] : sections;

  if (!intro && visibleSections.length === 0) return null;

  return (
    <section
      className="rounded-xl bg-surface-secondary/50 p-4 sm:rounded-2xl sm:p-6 lg:p-8"
      aria-labelledby="product-details-heading"
    >
      <h2
        id="product-details-heading"
        className="text-lg font-bold text-foreground sm:text-xl"
      >
        {title}
      </h2>

      {intro ? (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {intro}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-6">
        {visibleSections.map((section) => (
          <SpecSectionBlock key={section.id} section={section} />
        ))}
      </div>

      {moreSections.length > 0 ? (
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg border-muted/30 px-5 font-medium"
            onPress={() => setExpanded((v) => !v)}
          >
            {expanded ? viewLessLabel : viewMoreLabel}
            <Icon
              icon="lucide:chevron-down"
              width={16}
              height={16}
              className={
                expanded
                  ? 'rotate-180 transition-transform'
                  : 'transition-transform'
              }
              aria-hidden
            />
          </Button>
        </div>
      ) : null}
    </section>
  );
}

function SpecSectionBlock({ section }: { section: ProductDetailSection }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-foreground sm:text-base">
        {section.title}
      </h3>
      <dl className="mt-3 divide-y divide-muted/15 border-t border-muted/15">
        {section.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 py-3 text-sm"
          >
            <dt className="shrink-0 text-muted">{row.label}</dt>
            <dd className="text-end font-medium text-foreground">
              {Array.isArray(row.value) ? (
                <ul className="flex flex-col gap-0.5">
                  {row.value.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
