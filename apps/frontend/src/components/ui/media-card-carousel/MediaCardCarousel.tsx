'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type Transition,
} from 'motion/react';
import { Button } from '@heroui/react';
import { Image } from '@/components/base/image';
import type { ImageSource } from '@/lib/image-source';
import './MediaCardCarousel.css';

export type MediaCardCarouselItem = {
  id: string;
  title: string;
  description: string;
  eyebrow?: string;
  image: ImageSource;
  imageAlt: string;
  cta?: string;
  href?: string;
};

type MediaCardCarouselProps = {
  items: MediaCardCarouselItem[];
  contentDir?: 'rtl' | 'ltr';
  baseWidth?: number;
  itemHeight?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
};

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 12;
const SPRING_OPTIONS: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

type CarouselSlideProps = {
  item: MediaCardCarouselItem;
  index: number;
  itemWidth: number;
  itemHeight: number;
  trackItemOffset: number;
  x: MotionValue<number>;
  transition: Transition;
  contentDir: 'rtl' | 'ltr';
};

function CarouselSlide({
  item,
  index,
  itemWidth,
  itemHeight,
  trackItemOffset,
  x,
  transition,
  contentDir,
}: CarouselSlideProps) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [14, 0, -14];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className="media-card-carousel-item"
      style={{
        width: itemWidth,
        height: itemHeight,
        rotateY,
      }}
      transition={transition}
    >
      <div className="media-card-carousel-item-media">
        <Image
          src={item.image}
          alt={item.imageAlt}
          sizes="(max-width: 768px) 85vw, 340px"
          fit="cover"
          quality={85}
        />
      </div>
      <div className="media-card-carousel-item-overlay" aria-hidden />
      <div className="media-card-carousel-item-content" dir={contentDir}>
        {item.eyebrow ? (
          <span className="media-card-carousel-item-eyebrow">
            {item.eyebrow}
          </span>
        ) : null}
        <h3 className="media-card-carousel-item-title">{item.title}</h3>
        <p className="media-card-carousel-item-description">
          {item.description}
        </p>
        {item.cta && item.href ? (
          <Link href={item.href} className="mt-1" prefetch={false}>
            <Button
              className="h-8 min-h-8 rounded-md border-white/35 bg-white/15 px-3 text-[11px] font-medium text-white backdrop-blur-sm hover:bg-white/25"
              variant="outline"
              size="sm"
            >
              {item.cta}
            </Button>
          </Link>
        ) : null}
      </div>
    </motion.div>
  );
}

export function MediaCardCarousel({
  items,
  contentDir = 'rtl',
  baseWidth = 300,
  itemHeight = 280,
  autoplay = true,
  autoplayDelay = 4000,
  pauseOnHover = true,
  loop = true,
}: MediaCardCarouselProps) {
  const containerPadding = 16;
  const itemWidth = Math.max(baseWidth - containerPadding * 2, 200);
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return undefined;

    const container = containerRef.current;
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition: Transition = isJumping
    ? { duration: 0 }
    : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }

    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  if (items.length === 0) return null;

  return (
    <div ref={containerRef} className="media-card-carousel-container" dir="ltr">
      <motion.div
        className="media-card-carousel-track"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselSlide
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
            contentDir={contentDir}
          />
        ))}
      </motion.div>
      <div className="media-card-carousel-indicators-container">
        <div className="media-card-carousel-indicators">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className={`media-card-carousel-indicator ${
                activeIndex === index ? 'active' : 'inactive'
              }`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
              role="button"
              tabIndex={0}
              aria-label={`اسلاید ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setPosition(loop ? index + 1 : index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
