'use client';

import { Button } from '@heroui/react';
import { useLandingContent } from '@/i18n';

export function PromoBannerGrid() {
  const { promoBanners } = useLandingContent();

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {promoBanners.map((banner) => {
        const isImageStart = banner.align === 'image-start';
        const bg =
          banner.tone === 'muted' ? 'bg-surface-secondary' : 'bg-background';
        return (
          <article
            key={banner.id}
            className={`flex flex-col gap-6 rounded-2xl border border-foreground/5 p-6 sm:flex-row sm:items-center ${bg} ${
              isImageStart ? 'sm:flex-row' : 'sm:flex-row-reverse'
            }`}
          >
            <div
              className="mx-auto flex size-36 shrink-0 items-center justify-center rounded-xl bg-surface-tertiary sm:mx-0 sm:size-40"
              aria-hidden
            />
            <div className="flex flex-1 flex-col gap-2 text-start">
              <h2 className="text-xl font-bold text-foreground">
                {banner.title}
              </h2>
              <p className="text-sm text-muted">{banner.description}</p>
              {'cta' in banner && banner.cta ? (
                <div className="pt-2">
                  <Button variant="primary">{banner.cta}</Button>
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </section>
  );
}
