'use client';

import { Icon } from '@iconify/react';
import type { CheckoutStep } from '@/app/checkout/_lib/checkout-store';
import { cn } from '@/components/base/_lib/utils';

type StepConfig = {
  id: CheckoutStep;
  label: string;
  icon: string;
};

type CheckoutStepperProps = {
  currentStep: CheckoutStep;
  steps: StepConfig[];
};

export function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  return (
    <nav
      aria-label="Checkout progress"
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-4"
    >
      {steps.map((step, index) => {
        const active = step.id === currentStep;
        const completed = step.id < currentStep;

        return (
          <div key={step.id} className="flex items-center gap-2 sm:gap-4">
            <div
              className={cn(
                'flex items-center gap-2',
                active ? 'text-foreground' : 'text-muted',
              )}
            >
              <span
                className={cn(
                  'flex size-9 items-center justify-center rounded-full border-2 sm:size-10',
                  active || completed
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-muted/30 bg-surface',
                )}
              >
                <Icon icon={step.icon} width={18} height={18} aria-hidden />
              </span>
              <span
                className={cn(
                  'text-xs font-semibold sm:text-sm',
                  active && 'font-bold',
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                className="hidden h-px w-8 border-t border-dashed border-muted/40 sm:block sm:w-16 lg:w-24"
                aria-hidden
              />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
