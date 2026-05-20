import Link from 'next/link';
import { Image } from '@/components/base/image';
import type { ImageSource } from '@/lib/image-source';

export type FeaturedCategoryCardVariant = 'featured' | 'wide' | 'compact';

export type FeaturedCategoryCardProps = {
  title: string;
  description: string;
  image: ImageSource;
  imageAlt: string;
  href: string;
  shopLabel?: string;
  variant?: FeaturedCategoryCardVariant;
};

const variantClasses: Record<FeaturedCategoryCardVariant, string> = {
  featured: 'min-h-[300px] sm:min-h-[360px] lg:min-h-0 lg:h-full',
  wide: 'min-h-[200px] sm:min-h-[240px]',
  compact: 'min-h-[200px] sm:min-h-[240px]',
};

const imageSizes: Record<FeaturedCategoryCardVariant, string> = {
  featured: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
  wide: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 720px',
  compact: '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 480px',
};

export function FeaturedCategoryCard({
  title,
  description,
  image,
  imageAlt,
  href,
  shopLabel = 'خرید کنید',
  variant = 'compact',
}: FeaturedCategoryCardProps) {
  return (
    <article
      className={`relative flex overflow-hidden rounded-2xl bg-hero-bg ${variantClasses[variant]}`}
    >
      <Image
        src={image}
        alt={imageAlt}
        sizes={imageSizes[variant]}
        fit="cover"
        priority={variant === 'featured' || variant === 'wide'}
        className="opacity-90"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10"
        aria-hidden
      />
      <div className="relative flex h-full flex-col justify-end gap-1.5 p-5 text-start text-hero-fg sm:p-6">
        <h3 className="text-lg font-bold leading-snug sm:text-xl">{title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-hero-fg-muted">
          {description}
        </p>
        <Link
          href={href}
          prefetch={false}
          className="mt-1 w-fit text-sm font-medium text-hero-fg underline underline-offset-4 transition hover:text-white"
        >
          {shopLabel}
        </Link>
      </div>
    </article>
  );
}
