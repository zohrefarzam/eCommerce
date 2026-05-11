"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

type ProductCardProps = {
  name: string;
  price: string;
  buyLabel?: string;
};

export function ProductCard({
  name,
  price,
  buyLabel = "خرید",
}: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article className="relative flex flex-col gap-3 rounded-2xl bg-surface-secondary p-4 text-start">
      <button
        type="button"
        aria-label={favorite ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
        aria-pressed={favorite}
        onClick={() => setFavorite((v) => !v)}
        className="absolute end-3 top-3 rounded-full p-1.5 text-muted transition hover:bg-white/60"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s-7-4.35-9.6-8.4C-.3 8.85 1.2 4.8 5.4 4.2c2.1-.3 3.9.9 4.8 2.1.9-1.2 2.7-2.4 4.8-2.1 4.2.6 5.7 4.65 3 8.4C19 16.65 12 21 12 21Z"
            stroke={favorite ? "#e11d48" : "currentColor"}
            fill={favorite ? "#e11d48" : "none"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className="mx-auto flex aspect-square w-full max-w-[180px] items-center justify-center rounded-xl bg-surface-tertiary"
        aria-hidden
      />

      <h3 className="pt-2 text-sm font-semibold leading-snug text-foreground">
        {name}
      </h3>
      <p className="text-sm font-bold text-foreground">{price}</p>
      <Button variant="primary" fullWidth>
        {buyLabel}
      </Button>
    </article>
  );
}
