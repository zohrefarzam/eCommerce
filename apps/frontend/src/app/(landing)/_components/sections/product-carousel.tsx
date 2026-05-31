'use client';

import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { Image } from '@/components/base/image';
import type { ImageSource } from '@/components/base/_lib/image-source';
import { useRemountOnReturn } from '@/app/(landing)/_lib/use-remount-on-return';
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
  /** Remount swiper when slides change (e.g. locale switch). */
  carouselKey?: string;
};

const FALLBACK_CAROUSEL_IMAGES: ProductCarouselImage[] = [
  { src: '/images/products/product-1.jpg', alt: 'Featured product one' },
  { src: '/images/products/product-2.jpg', alt: 'Featured product two' },
  { src: '/images/products/product-3.jpg', alt: 'Featured product three' },
];

export function ProductCarouselSection({
  images,
  carouselKey = 'default',
}: ProductCarouselSectionProps) {
  const returnKey = useRemountOnReturn('/');
  const slides = useMemo(
    () => (images?.length ? images : FALLBACK_CAROUSEL_IMAGES),
    [images],
  );

  const slidesKey = useMemo(
    () =>
      slides
        .map((slide) =>
          typeof slide.src === 'string' ? slide.src : slide.src.src,
        )
        .join('|'),
    [slides],
  );

  const swiperRef = useRef<SwiperClass | null>(null);
  const enableLoop = slides.length > 2;

  useEffect(() => {
    return () => {
      swiperRef.current?.destroy(true, true);
      swiperRef.current = null;
    };
  }, []);

  return (
    <section className="w-full min-w-0 max-w-full overflow-hidden bg-hero-bg">
      <div className="group relative w-full min-w-0 py-0">
        <Swiper
          key={`${carouselKey}-${slidesKey}-${returnKey}`}
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={enableLoop}
          speed={700}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="product-swiper w-full max-w-full overflow-hidden border-y border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
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
              <SwiperSlide key={key} className="!w-full">
                <div className="product-carousel-slide relative w-full overflow-hidden bg-hero-bg">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    sizes="100vw"
                    layout="responsive"
                    fit="cover"
                    quality={100}
                    priority={index === 0}
                    className="!h-full !w-full"
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
        .product-swiper {
          width: 100%;
          max-width: 100%;
          height: auto !important;
        }
        .product-swiper .swiper-wrapper {
          height: auto !important;
        }
        .product-swiper .swiper-slide {
          width: 100% !important;
          height: auto !important;
        }
        .product-carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .product-swiper .swiper-pagination {
          bottom: 0.75rem !important;
        }
        .product-swiper .swiper-pagination-bullet-active {
          background: #fff !important;
        }
        .product-carousel-slide {
          aspect-ratio: 1440 / 520;
          max-height: 520px;
        }
      `}</style>
    </section>
  );
}
