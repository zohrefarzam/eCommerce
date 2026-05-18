'use client';

import { Image } from '@/components/baseComponents/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import CardSwap, { Card } from '@/landing/_components/ui/card-swap/CardSwap';
import { cardSwapPromos, cardSwapSection } from '@/landing/_content/landing';

export function CardSwapShowcase() {
  return (
    <section aria-label="پیشنهادهای ویژه">
      <div className="grid min-h-[320px] overflow-hidden rounded-2xl border border-foreground/5 bg-surface-secondary sm:min-h-[340px] lg:min-h-[360px] lg:grid-cols-[minmax(0,1fr)_minmax(240px,42%)]">
        {/* RTL: first column = right — copy */}
        <div className="flex items-center p-5 sm:p-6 lg:p-8">
          <div className="flex max-w-md flex-col gap-2 text-start">
            <h2 className="text-xl font-bold leading-tight text-foreground sm:text-2xl lg:text-3xl">
              {cardSwapSection.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {cardSwapSection.description}
            </p>
          </div>
        </div>

        {/* RTL: second column = left — card stack pinned to corner */}
        <div className="card-swap-stage flex min-h-[280px] items-end lg:min-h-full">
          <CardSwap
            rtl
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
                      <Button
                        className="rounded-md border-white/35 bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/25 sm:text-sm"
                        variant="outline"
                      >
                        {promo.cta}
                      </Button>
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
