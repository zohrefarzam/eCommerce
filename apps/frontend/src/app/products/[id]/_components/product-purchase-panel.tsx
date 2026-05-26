'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { useCartStore } from '@/lib/cart-store';
import { cn } from '@/lib/utils';
import type {
  ProductColorOption,
  ProductDetail,
  ProductStorageOption,
  ProductTrustBadge,
} from '@/lib/product-detail';
import { ProductSpecGrid } from './product-spec-grid';

type ProductPurchasePanelProps = {
  detail: ProductDetail;
  colorId: string;
  onColorSelect: (id: string) => void;
  labels: {
    selectColor: string;
    addToWishlist: string;
    addToCart: string;
    readMore: string;
    readLess: string;
  };
};

export function ProductPurchasePanel({
  detail,
  colorId,
  onColorSelect,
  labels,
}: ProductPurchasePanelProps) {
  const { product, displayName, colors, storageOptions } = detail;
  const [storageGb, setStorageGb] = useState(
    detail.defaultStorageGb || storageOptions[0]?.gb || 0,
  );
  const [wishlist, setWishlist] = useState(product.defaultFavorite ?? false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const selectedColor = colors.find((c) => c.id === colorId);
  const selectedStorage = storageOptions.find((o) => o.gb === storageGb);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: displayName,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.image,
      imageAlt: product.imageAlt,
      colorId: selectedColor?.id,
      colorLabel: selectedColor?.label,
      storageGb: selectedStorage?.gb,
      storageLabel: selectedStorage?.label,
    });
  };

  const description = detail.shortDescription;
  const descriptionPreview =
    description.length > 160 && !expandedDescription
      ? `${description.slice(0, 160).trim()}…`
      : description;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-xl font-bold leading-tight text-foreground sm:text-2xl lg:text-3xl">
          {displayName}
        </h1>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
            {product.price}
          </p>
          {product.compareAtPrice ? (
            <p className="text-base font-medium text-muted line-through tabular-nums sm:text-lg">
              {product.compareAtPrice}
            </p>
          ) : null}
        </div>
      </header>

      {colors.length > 0 ? (
        <ColorSwatches
          label={labels.selectColor}
          colors={colors}
          selectedId={colorId}
          onSelect={onColorSelect}
        />
      ) : null}

      {storageOptions.length > 1 ? (
        <StorageOptions
          options={storageOptions}
          selectedGb={storageGb}
          onSelect={setStorageGb}
        />
      ) : null}

      <ProductSpecGrid specs={detail.highlights} />

      <div className="text-sm leading-relaxed text-muted">
        <p>{descriptionPreview}</p>
        {description.length > 160 ? (
          <Button
            variant="ghost"
            size="sm"
            className="-ms-2 mt-0.5 h-auto min-h-0 p-2 text-sm font-semibold text-foreground underline-offset-2 hover:underline"
            onPress={() => setExpandedDescription((v) => !v)}
          >
            {expandedDescription ? labels.readLess : labels.readMore}
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <Button
          variant="outline"
          fullWidth
          className="h-12 gap-2 rounded-xl border-foreground font-semibold text-foreground"
          onPress={() => setWishlist((v) => !v)}
        >
          <Icon
            icon="lucide:heart"
            width={18}
            height={18}
            className={cn(
              wishlist ? 'text-foreground [&_path]:fill-current' : '',
            )}
            aria-hidden
          />
          <span>{labels.addToWishlist}</span>
        </Button>
        <Button
          variant="primary"
          fullWidth
          className="h-12 rounded-xl !bg-foreground !text-background font-semibold hover:!bg-foreground/90"
          onPress={handleAddToCart}
        >
          {labels.addToCart}
        </Button>
      </div>

      <TrustBadges badges={detail.trustBadges} />
    </div>
  );
}

type ColorSwatchesProps = {
  label: string;
  colors: readonly ProductColorOption[];
  selectedId: string;
  onSelect: (id: string) => void;
};

function ColorSwatches({
  label,
  colors,
  selectedId,
  onSelect,
}: ColorSwatchesProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-foreground">
        <span className="font-medium">{label}</span>
      </p>
      <div
        className="flex flex-wrap items-center gap-3"
        role="group"
        aria-label={label}
      >
        {colors.map((color) => {
          const selected = color.id === selectedId;
          return (
            <Button
              key={color.id}
              isIconOnly
              variant="ghost"
              aria-label={color.label}
              aria-pressed={selected}
              onPress={() => onSelect(color.id)}
              className={cn(
                'size-8 min-w-8 rounded-full p-0 shadow-none',
                'ring-2 ring-offset-2 ring-offset-background',
                selected ? 'ring-foreground' : 'ring-transparent',
              )}
              style={{ backgroundColor: color.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}

type StorageOptionsProps = {
  options: readonly ProductStorageOption[];
  selectedGb: number;
  onSelect: (gb: number) => void;
};

function StorageOptions({
  options,
  selectedGb,
  onSelect,
}: StorageOptionsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Storage capacity"
    >
      {options.map((option) => {
        const selected = option.gb === selectedGb;
        return (
          <Button
            key={option.gb}
            variant="outline"
            size="sm"
            aria-pressed={selected}
            onPress={() => onSelect(option.gb)}
            className={cn(
              'min-w-[4.75rem] rounded-lg border-2 px-4 py-2.5 text-sm font-medium',
              selected
                ? 'border-foreground bg-surface text-foreground'
                : 'border-muted/25 bg-surface text-foreground hover:border-muted/50',
            )}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}

function TrustBadges({ badges }: { badges: readonly ProductTrustBadge[] }) {
  if (badges.length === 0) return null;

  return (
    <ul className="grid grid-cols-3 gap-2 sm:gap-3">
      {badges.map((badge) => (
        <li
          key={badge.title}
          className={cn(
            'flex flex-col items-center justify-center gap-2 rounded-xl',
            'bg-surface-secondary px-2 py-4 text-center sm:px-3 sm:py-5',
          )}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-surface">
            <Icon
              icon={badge.icon}
              width={22}
              height={22}
              className="text-foreground"
              aria-hidden
            />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-foreground sm:text-sm">
              {badge.title}
            </span>
            <span className="text-[10px] text-muted sm:text-xs">
              {badge.subtitle}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
