'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { AuthField } from '@/app/auth/_components/auth-field';
import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { Select } from '@/components/base/select';
import { useLocale } from '@/i18n';
import { useAdminCategoriesStore } from '@/lib/admin-categories-store';
import type {
  AdminProduct,
  AdminProductInput,
} from '@/lib/admin-products-store';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

type ProductFormModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: AdminProduct | null;
  onSubmit: (input: AdminProductInput) => void;
};

export function ProductFormModal({
  isOpen,
  onOpenChange,
  product,
  onSubmit,
}: ProductFormModalProps) {
  const { messages } = useLocale();
  const labels = messages.admin;
  const categories = useAdminCategoriesStore((s) => s.categories);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    image?: string;
  }>({});

  useEffect(() => {
    if (!isOpen) return;
    setName(product?.name ?? '');
    setPrice(product?.price ?? '');
    setBrand(product?.brand ?? '');
    setCategorySlug(product?.categorySlug ?? categories[0]?.slug ?? '');
    setImageUrl(product?.imageUrl ?? '');
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [isOpen, product, categories]);

  const categoryOptions = categories.map((category) => ({
    id: category.slug,
    label: category.label,
  }));

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: labels.invalidImageType }));
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setErrors((prev) => ({ ...prev, image: labels.imageTooLarge }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        setErrors((prev) => ({ ...prev, image: undefined }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setErrors((prev) => ({ ...prev, image: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = labels.requiredField;
    if (!price.trim()) nextErrors.price = labels.requiredField;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      name: name.trim(),
      price: price.trim(),
      brand: brand.trim(),
      categorySlug,
      imageUrl,
    });
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={product ? labels.editProductTitle : labels.addProduct}
      placement="center"
      className="sm:!max-w-md"
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <AuthField
          label={labels.productName}
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={errors.name}
        />
        <AuthField
          label={labels.productPrice}
          type="text"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
            setErrors((prev) => ({ ...prev, price: undefined }));
          }}
          error={errors.price}
        />
        <AuthField
          label={labels.productBrand}
          type="text"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />

        {categoryOptions.length > 0 ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">
              {labels.productCategory}
            </label>
            <Select
              options={categoryOptions}
              selectedKey={categorySlug}
              onSelectionChange={setCategorySlug}
              aria-label={labels.productCategory}
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <span className="text-sm text-foreground">{labels.productImage}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            className="sr-only"
            onChange={handleImageSelect}
          />
          {imageUrl ? (
            <div className="flex items-start gap-3">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-muted/20 bg-surface-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element -- data URLs from local uploads */}
                <img
                  src={imageUrl}
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg"
                  onPress={() => fileInputRef.current?.click()}
                >
                  <Icon
                    icon="lucide:upload"
                    width={16}
                    height={16}
                    aria-hidden
                  />
                  <span className="ms-1.5">{labels.uploadImage}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg text-red-600 hover:bg-red-500/10 hover:text-red-600"
                  onPress={handleRemoveImage}
                >
                  <Icon
                    icon="lucide:trash-2"
                    width={16}
                    height={16}
                    aria-hidden
                  />
                  <span className="ms-1.5">{labels.removeImage}</span>
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-muted/30 bg-surface-secondary px-4 py-8 text-muted transition hover:border-muted/50 hover:text-foreground"
            >
              <Icon
                icon="lucide:image-plus"
                width={28}
                height={28}
                aria-hidden
              />
              <span className="text-sm">{labels.uploadImage}</span>
            </button>
          )}
          {errors.image ? (
            <p className="text-xs text-red-600" role="alert">
              {errors.image}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl sm:min-w-28"
            onPress={() => onOpenChange(false)}
          >
            {labels.cancel}
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="h-11 rounded-xl !bg-foreground !text-background font-semibold hover:!bg-foreground/90 sm:min-w-28"
          >
            {labels.save}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
