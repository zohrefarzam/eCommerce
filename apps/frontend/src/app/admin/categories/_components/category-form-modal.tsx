'use client';

import { useEffect, useState } from 'react';
import { AuthField } from '@/app/auth/_components/auth-field';
import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { useLocale } from '@/i18n';
import type { AdminCategory } from '@/app/admin/_lib/admin-categories-store';

type CategoryFormModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category: AdminCategory | null;
  onSubmit: (
    input: AdminCategory,
  ) => { ok: true } | { ok: false; error: 'exists' };
};

export function CategoryFormModal({
  isOpen,
  onOpenChange,
  category,
  onSubmit,
}: CategoryFormModalProps) {
  const { messages } = useLocale();
  const labels = messages.admin;

  const [label, setLabel] = useState('');
  const [slug, setSlug] = useState('');
  const [errors, setErrors] = useState<{ label?: string; slug?: string }>({});

  useEffect(() => {
    if (!isOpen) return;
    setLabel(category?.label ?? '');
    setSlug(category?.slug ?? '');
    setErrors({});
  }, [isOpen, category]);

  const handleSubmit = () => {
    const nextErrors: typeof errors = {};
    if (!label.trim()) nextErrors.label = labels.requiredField;
    if (!slug.trim()) nextErrors.slug = labels.requiredField;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = onSubmit({ label: label.trim(), slug: slug.trim() });
    if (!result.ok) {
      setErrors({ slug: labels.slugExists });
      return;
    }
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={category ? labels.editCategoryTitle : labels.addCategory}
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
          label={labels.categoryName}
          type="text"
          value={label}
          onChange={(event) => {
            setLabel(event.target.value);
            setErrors((prev) => ({ ...prev, label: undefined }));
          }}
          error={errors.label}
        />
        <AuthField
          label={labels.categorySlug}
          type="text"
          value={slug}
          onChange={(event) => {
            setSlug(event.target.value);
            setErrors((prev) => ({ ...prev, slug: undefined }));
          }}
          error={errors.slug}
        />

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
