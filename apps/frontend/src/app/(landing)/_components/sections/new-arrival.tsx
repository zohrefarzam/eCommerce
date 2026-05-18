import { SectionHeader } from '@/landing/_components/ui/section-header';
import { FeaturedCategoryCard } from '@/landing/_components/ui/featured-category-card';
import {
  newArrivalCategories,
  newArrivalSection,
} from '@/landing/_content/landing';

export function NewArrival() {
  const [featured, wide, ...compact] = newArrivalCategories;

  return (
    <section
      className="flex flex-col gap-6"
      aria-label={newArrivalSection.title}
    >
      <SectionHeader title={newArrivalSection.title} />
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        {featured ? (
          <FeaturedCategoryCard
            {...featured}
            shopLabel={newArrivalSection.shopNowLabel}
            variant="featured"
          />
        ) : null}

        <div className="flex flex-col gap-6">
          {wide ? (
            <FeaturedCategoryCard
              {...wide}
              shopLabel={newArrivalSection.shopNowLabel}
              variant="wide"
            />
          ) : null}
          <div className="grid grid-cols-2 gap-6">
            {compact.map((category) => (
              <FeaturedCategoryCard
                key={category.slug}
                {...category}
                shopLabel={newArrivalSection.shopNowLabel}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
