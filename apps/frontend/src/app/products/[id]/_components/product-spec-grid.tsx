'use client';

import { Icon } from '@iconify/react';
import type { ProductHighlightSpec } from '@/app/products/_lib/product-detail';

type ProductSpecGridProps = {
  specs: readonly ProductHighlightSpec[];
};

export function ProductSpecGrid({ specs }: ProductSpecGridProps) {
  if (specs.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
      {specs.map((spec) => (
        <li
          key={`${spec.label}-${spec.value}`}
          className="flex flex-col gap-2 rounded-xl bg-surface-secondary px-3 py-3 sm:px-4 sm:py-4"
        >
          <Icon
            icon={spec.icon}
            width={18}
            height={18}
            className="text-muted"
            aria-hidden
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-muted sm:text-xs">
              {spec.label}
            </span>
            <span className="text-xs font-semibold text-foreground sm:text-sm">
              {spec.value}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
