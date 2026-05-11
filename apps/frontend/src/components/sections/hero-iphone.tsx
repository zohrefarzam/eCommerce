"use client";

import { Button } from "@heroui/react";
import { STOREFRONT_CONTENT_FRAME } from "@/components/layout/site-shell";
import { heroContent } from "@/content/landing";

export function HeroIphone() {
  return (
    <section className="w-full bg-hero-bg pt-0 text-hero-fg">
      <div
        className={`${STOREFRONT_CONTENT_FRAME} grid gap-8 py-10 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-14`}
      >
        <div className="flex max-w-xl flex-col gap-4 text-start">
          <p className="text-sm font-medium text-hero-fg-muted">
            {heroContent.eyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-hero-fg sm:text-5xl">
            {heroContent.title}
          </h1>
          <p className="text-base leading-relaxed text-hero-fg-muted">
            {heroContent.description}
          </p>
          <div>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {heroContent.cta}
            </Button>
          </div>
        </div>
        <figure className="relative flex min-h-[220px] w-full items-center justify-center lg:min-h-[300px]">
          {/* Add <Image fill className="object-contain object-center" sizes="(min-width:1024px)50vw,100vw" /> when asset exists */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent lg:rounded-2xl"
            aria-hidden
          />
          <div
            className="relative z-[1] size-44 rounded-3xl border border-white/15 bg-white/5 sm:size-52"
            aria-hidden
          />
        </figure>
      </div>
    </section>
  );
}
