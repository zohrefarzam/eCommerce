'use client';

import {
  Button as HeroUIButton,
  type ButtonProps as HeroUIButtonProps,
} from '@heroui/react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/components/base/_lib/utils';

export type BaseButtonVariant =
  | 'primary'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'hoverBorder';

const heroVariants = new Set<BaseButtonVariant>([
  'primary',
  'outline',
  'secondary',
  'ghost',
]);

const hoverBorderSizeClass = {
  sm: 'gap-1 px-4 py-2 text-xs font-medium',
  md: 'gap-1.5 px-5 py-2.5 text-sm font-medium sm:px-6 sm:py-3',
  lg: 'gap-2 px-6 py-3 text-base font-medium sm:px-8 sm:py-3.5',
} as const;

type HoverBorderDirection = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

const hoverBorderMovingMap: Record<HoverBorderDirection, string> = {
  TOP: 'radial-gradient(40% 120% at 50% 0%, #ffffff 0%, #c4c4c4 35%, rgba(0, 0, 0, 0) 72%)',
  LEFT: 'radial-gradient(120% 40% at 0% 50%, #ffffff 0%, #c4c4c4 35%, rgba(0, 0, 0, 0) 72%)',
  BOTTOM:
    'radial-gradient(40% 120% at 50% 100%, #ffffff 0%, #c4c4c4 35%, rgba(0, 0, 0, 0) 72%)',
  RIGHT:
    'radial-gradient(120% 40% at 100% 50%, #ffffff 0%, #c4c4c4 35%, rgba(0, 0, 0, 0) 72%)',
};

const hoverBorderHighlight =
  'radial-gradient(90% 200% at 50% 50%, #ffffff 0%, #d4d4d4 40%, rgba(0, 0, 0, 0) 75%)';

export type BaseButtonProps = Omit<HeroUIButtonProps, 'variant'> & {
  variant?: BaseButtonVariant;
  href?: string;
  prefetch?: boolean;
  /** Directional sweep step duration in seconds (hoverBorder only). */
  borderDuration?: number;
  /** Full conic spin duration in seconds (hoverBorder only). */
  spinDuration?: number;
};

export const Button = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      variant = 'primary',
      href,
      prefetch = false,
      className,
      children,
      size = 'md',
      borderDuration = 1.25,
      spinDuration = 6,
      isDisabled,
      onPress,
      ...props
    },
    ref,
  ) => {
    if (variant === 'hoverBorder') {
      const sizeKey =
        size === 'sm' || size === 'md' || size === 'lg' ? size : 'md';

      const hoverBorderButton = (
        <HoverBorderButtonSurface
          ref={ref}
          as={href ? 'span' : 'button'}
          type={href ? undefined : 'button'}
          borderDuration={borderDuration}
          spinDuration={spinDuration}
          className={cn(hoverBorderSizeClass[sizeKey], className)}
          disabled={isDisabled}
          onClick={
            onPress && !href
              ? () => onPress({} as Parameters<NonNullable<typeof onPress>>[0])
              : undefined
          }
        >
          {children}
        </HoverBorderButtonSurface>
      );

      if (href) {
        return (
          <Link href={href} prefetch={prefetch} className="inline-flex w-fit">
            {hoverBorderButton}
          </Link>
        );
      }

      return hoverBorderButton;
    }

    const heroVariant = heroVariants.has(variant) ? variant : 'primary';

    const heroButton = (
      <HeroUIButton
        ref={ref}
        variant={heroVariant}
        size={size}
        className={className}
        isDisabled={isDisabled}
        onPress={onPress}
        {...props}
      >
        {children}
      </HeroUIButton>
    );

    if (href) {
      return (
        <Link href={href} prefetch={prefetch} className="inline-flex w-fit">
          {heroButton}
        </Link>
      );
    }

    return heroButton;
  },
);

Button.displayName = 'Button';

type HoverBorderButtonSurfaceProps = {
  as?: 'button' | 'span';
  type?: 'button';
  borderDuration: number;
  spinDuration: number;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const HoverBorderButtonSurface = forwardRef<
  HTMLButtonElement,
  HoverBorderButtonSurfaceProps
>(function HoverBorderButtonSurface(
  {
    as: Tag = 'button',
    type = 'button',
    borderDuration,
    spinDuration,
    className,
    disabled,
    onClick,
    children,
  },
  ref,
) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<HoverBorderDirection>('TOP');

  const rotateDirection = (
    current: HoverBorderDirection,
  ): HoverBorderDirection => {
    const directions: HoverBorderDirection[] = [
      'TOP',
      'LEFT',
      'BOTTOM',
      'RIGHT',
    ];
    const index = directions.indexOf(current);
    return directions[(index - 1 + directions.length) % directions.length];
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, borderDuration * 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [hovered, borderDuration]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLButtonElement>}
      type={Tag === 'button' ? type : undefined}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative inline-flex overflow-hidden rounded-md p-[3px] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'conic-gradient(from 0deg, #ffffff, #a3a3a3, #ffffff, #737373, #e5e5e5, #ffffff)',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: spinDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
        initial={false}
        animate={{
          background: hovered
            ? [
                hoverBorderMovingMap[direction],
                hoverBorderHighlight,
                hoverBorderMovingMap[direction],
              ]
            : hoverBorderMovingMap[direction],
        }}
        transition={{
          duration: hovered ? borderDuration * 0.85 : borderDuration,
          ease: 'linear',
        }}
        style={{ filter: 'blur(0.5px)' }}
      />
      <span
        className={cn(
          'relative z-10 flex w-full items-center justify-center rounded-[5px] bg-black text-white',
          className,
        )}
      >
        {children}
      </span>
    </Tag>
  );
});
