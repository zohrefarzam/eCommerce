import { serviceHighlights } from '@/landing/_content/landing';
import { ServiceHighlightItem } from '@/landing/_components/ui/service-highlight-item';

export function ServiceHighlights() {
  return (
    <section className="relative py-12 sm:py-16" aria-label="خدمات فروشگاه">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        {serviceHighlights.map((item) => (
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
