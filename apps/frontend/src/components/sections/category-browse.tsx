import { browseCategories } from "@/content/landing";
import { SectionHeader } from "@/components/ui/section-header";
import { CategoryCard } from "@/components/ui/category-card";

export function CategoryBrowse() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader title="مرور بر اساس دسته" />
      <div className="flex flex-wrap gap-3">
        {browseCategories.map((cat) => (
          <CategoryCard
            key={cat.slug}
            href={`/category/${cat.slug}`}
            label={cat.label}
          />
        ))}
      </div>
    </section>
  );
}
