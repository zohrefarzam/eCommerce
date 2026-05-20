'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Image } from '@/components/base/image';
import Link from 'next/link';
import { Button as HeroUIButton } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { useLandingContent, useLocale } from '@/i18n';
import CardSwap, { Card } from '@/components/ui/card-swap/CardSwap';
import {
  MediaCardCarousel,
  type MediaCardCarouselItem,
} from '@/components/ui/media-card-carousel/MediaCardCarousel';

function PromotionShowcaseCopy({ compact = false }: { compact?: boolean }) {
  const { cardSwapSection } = useLandingContent();
  const { config } = useLocale();
  const arrowIcon =
    config.dir === 'rtl' ? 'lucide:arrow-left' : 'lucide:arrow-right';

  return (
    <div
      className={
        compact
          ? 'flex max-w-md flex-col gap-3 text-start'
          : 'flex max-w-md flex-col gap-4 text-start sm:gap-5'
      }
    >
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h2
          className={
            compact
              ? 'text-lg font-bold leading-tight text-foreground'
              : 'text-xl font-bold leading-tight text-foreground sm:text-2xl lg:text-3xl'
          }
        >
          {cardSwapSection.title}
        </h2>
        <p
          className={
            compact
              ? 'text-xs leading-relaxed text-muted'
              : 'text-sm leading-relaxed text-muted sm:text-base'
          }
        >
          {cardSwapSection.description}
        </p>
      </div>
      <Button
        variant="hoverBorder"
        size={compact ? 'sm' : 'md'}
        href={cardSwapSection.href}
      >
        {cardSwapSection.cta}
        <Icon
          icon={arrowIcon}
          width={compact ? 14 : 16}
          height={compact ? 14 : 16}
          aria-hidden
        />
      </Button>
    </div>
  );
}

function MobilePromotionCarousel() {
  const { cardSwapPromos } = useLandingContent();
  const { config } = useLocale();
  const measureRef = useRef<HTMLDivElement>(null);
  const [baseWidth, setBaseWidth] = useState(320);

  const mediaCardItems: MediaCardCarouselItem[] = useMemo(
    () =>
      cardSwapPromos.map((promo: (typeof cardSwapPromos)[number]) => ({
        id: promo.id,
        title: promo.title,
        description: promo.description,
        eyebrow: promo.eyebrow,
        image: promo.image,
        imageAlt: promo.imageAlt,
        cta: promo.cta,
        href: promo.href,
      })),
    [cardSwapPromos],
  );

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return undefined;

    const update = () => {
      setBaseWidth(Math.max(Math.floor(el.clientWidth), 260));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={measureRef} className="w-full">
      <MediaCardCarousel
        items={mediaCardItems}
        contentDir={config.dir}
        baseWidth={baseWidth}
        itemHeight={260}
        autoplay
        autoplayDelay={4000}
        pauseOnHover
        loop
      />
    </div>
  );
}

export function PromotionShowcase() {
  const { cardSwapPromos, cardSwapSection } = useLandingContent();
  const { config } = useLocale();

  return (
    <section aria-label={cardSwapSection.ariaLabel}>
      <div className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-foreground/5 bg-surface-secondary p-4 md:hidden">
        <PromotionShowcaseCopy compact />
        <MobilePromotionCarousel />
      </div>

      <div className="hidden min-h-[320px] overflow-hidden rounded-2xl border border-foreground/5 bg-surface-secondary md:grid lg:min-h-[340px] lg:grid-cols-[minmax(0,1fr)_minmax(240px,42%)]">
        <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8">
          <PromotionShowcaseCopy />
        </div>

        <div className="card-swap-stage flex min-h-[280px] items-end lg:min-h-full">
          <CardSwap
            rtl={config.dir === 'rtl'}
            width={340}
            height={300}
            cardDistance={38}
            verticalDistance={44}
            delay={5000}
            pauseOnHover
            skewAmount={5}
          >
            {cardSwapPromos.map((promo) => (
              <Card
                key={promo.id}
                customClass="card-overlay"
                className="relative overflow-hidden p-0"
              >
                <Image
                  src={promo.image}
                  alt={promo.imageAlt}
                  sizes="(max-width: 1024px) 50vw, 340px"
                  fit="cover"
                  quality={90}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                  aria-hidden
                />
                <div className="relative flex h-full flex-col justify-end gap-2.5 p-4 sm:p-5">
                  <div className="flex flex-col items-start gap-1 text-start text-white">
                    <span className="text-[11px] font-medium text-white/75">
                      {promo.eyebrow}
                    </span>
                    <h3 className="text-base font-bold leading-snug sm:text-lg">
                      {promo.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-white/85 sm:text-sm">
                      {promo.description}
                    </p>
                  </div>
                  {promo.cta ? (
                    <Link href={promo.href} className="w-fit">
                      <HeroUIButton
                        className="rounded-md border-white/35 bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/25 sm:text-sm"
                        variant="outline"
                      >
                        {promo.cta}
                      </HeroUIButton>
                    </Link>
                  ) : null}
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
