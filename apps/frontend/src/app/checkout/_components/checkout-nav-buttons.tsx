'use client';

import { Button } from '@/components/base/button';
import { cn } from '@/components/base/_lib/utils';

type CheckoutNavButtonsProps = {
  backLabel: string;
  nextLabel: string;
  onBack?: () => void;
  onNext: () => void;
  showBack?: boolean;
  nextDisabled?: boolean;
  className?: string;
};

export function CheckoutNavButtons({
  backLabel,
  nextLabel,
  onBack,
  onNext,
  showBack = true,
  nextDisabled,
  className,
}: CheckoutNavButtonsProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end',
        className,
      )}
    >
      {showBack && onBack ? (
        <Button
          variant="outline"
          className="h-11 min-w-[7rem] rounded-xl border-foreground font-semibold text-foreground sm:min-w-[8.5rem]"
          onPress={onBack}
        >
          {backLabel}
        </Button>
      ) : null}
      <Button
        variant="primary"
        className="h-11 min-w-[7rem] rounded-xl !bg-foreground !text-background font-semibold hover:!bg-foreground/90 sm:min-w-[8.5rem]"
        onPress={onNext}
        isDisabled={nextDisabled}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
