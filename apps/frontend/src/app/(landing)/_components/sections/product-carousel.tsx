'use client';

import { useMemo, useRef, type CSSProperties } from 'react';
import { Image } from '@/components/baseComponents/image';
import type { ImageSource } from '@/lib/image-source';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export type ProductCarouselImage = {
  src: ImageSource;
  alt: string;
};

type ProductCarouselSectionProps = {
  images?: ProductCarouselImage[];
};

const FALLBACK_CAROUSEL_IMAGES: ProductCarouselImage[] = [
  { src: '/images/products/product-1.jpg', alt: 'Featured product one' },
  { src: '/images/products/product-2.jpg', alt: 'Featured product two' },
  { src: '/images/products/product-3.jpg', alt: 'Featured product three' },
];

export function ProductCarouselSection({
  images,
}: ProductCarouselSectionProps) {
  const slides = useMemo(
    () => (images?.length ? images : FALLBACK_CAROUSEL_IMAGES),
    [images],
  );

  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="w-full bg-hero-bg">
      <div className="group relative w-full py-0">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          speed={700}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="product-swiper overflow-hidden border-y border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          style={
            {
              '--swiper-pagination-color': '#ffffff',
              '--swiper-pagination-bullet-inactive-color':
                'rgba(255,255,255,0.45)',
            } as CSSProperties
          }
        >
          {slides.map((slide, index) => {
            const key =
              typeof slide.src === 'string' ? slide.src : slide.src.src;
            return (
              <SwiperSlide key={key}>
                <div className="relative h-[560px]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    sizes="100vw"
                    fit="cover"
                    quality={100}
                    priority={index === 0}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div
          dir="ltr"
          className="pointer-events-none absolute bottom-4 right-4 z-10 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 sm:bottom-6 sm:right-6"
        >
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-black/80 bg-white text-black shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-black/80 bg-white text-black shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <style>{`
        .product-swiper .swiper-pagination-bullet-active {
          background: #fff !important;
        }
      `}</style>
    </section>
  );
}
