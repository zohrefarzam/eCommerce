'use client';

import { useLandingContent } from '@/i18n';
import type { ServiceHighlight } from '@/landing/_content/types';
import { ServiceHighlightItem } from '@/landing/_components/ui/service-highlight-item';

export function ServiceHighlights() {
  const { serviceHighlights, serviceHighlightsAria } = useLandingContent();

  return (
    <section
      className="relative py-6 sm:py-12 lg:py-16"
      aria-label={serviceHighlightsAria}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
        {serviceHighlights.map((item: ServiceHighlight) => (
          <ServiceHighlightItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
