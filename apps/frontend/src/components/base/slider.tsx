'use client';

import {
  I18nProvider,
  Slider as HeroUISlider,
  type SliderProps as HeroUISliderProps,
} from '@heroui/react';
import { cn } from '@/lib/utils';

/** Locale used for slider interaction — HeroUI/react-aria ignore `dir` on wrappers. */
const SLIDER_LOCALE = 'en-US';

export type BaseSliderProps = Omit<
  HeroUISliderProps,
  'children' | 'className'
> & {
  /** Classes merged onto the slider root. */
  className?: string;
  /** Classes merged onto the slider track. */
  trackClassName?: string;
  /** Classes merged onto the filled portion of the track. */
  fillClassName?: string;
  /** Classes merged onto each thumb. */
  thumbClassName?: string;
};

/* HeroUI's slider defaults use `bg-accent` (project maps it to red/orange).
 * Force-override only the color slots to the project's `foreground` token;
 * leave HeroUI's grid layout and thumb sizing intact. */
const trackClass =
  '!bg-muted/20 ' +
  'data-[fill-start=true]:!border-s-foreground ' +
  'data-[fill-end=true]:!border-e-foreground';

const fillClass = '!bg-foreground';

const thumbClass =
  '!bg-foreground after:!size-4 after:!rounded-full after:!bg-background ' +
  'data-[focus-visible=true]:!ring-foreground/20';

export function Slider({
  className,
  trackClassName,
  fillClassName,
  thumbClassName,
  ...props
}: BaseSliderProps) {
  /* react-aria reads direction from I18nProvider (fa-IR ⇒ RTL), not from `dir` on a
   * wrapper — in RTL, thumb 0 sits on the right and drives the min value. Nest an
   * LTR locale so left thumb = min and right thumb = max. */
  return (
    <I18nProvider locale={SLIDER_LOCALE}>
      <div
        dir="ltr"
        className={cn(
          /* Inset so thumbs are not clipped by accordion `overflow: clip` or narrow sidebars. */
          'box-border w-full px-3.5 py-1',
          className,
        )}
      >
        <HeroUISlider {...props} className="w-full">
          <HeroUISlider.Track className={cn(trackClass, trackClassName)}>
            {({ state }) => (
              <>
                <HeroUISlider.Fill className={cn(fillClass, fillClassName)} />
                {state.values.map((_, i) => (
                  <HeroUISlider.Thumb
                    key={i}
                    index={i}
                    className={cn(thumbClass, thumbClassName)}
                  />
                ))}
              </>
            )}
          </HeroUISlider.Track>
        </HeroUISlider>
      </div>
    </I18nProvider>
  );
}

Slider.displayName = 'Slider';
