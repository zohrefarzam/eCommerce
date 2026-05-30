'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/base/button';
import { useLocale } from '@/i18n';
import {
  useAdminCategoriesStore,
  type AdminCategory,
} from '@/lib/admin-categories-store';
import { AdminContentCard } from '../_components/admin-shell';
import { AdminConfirmDeleteModal } from '../_components/admin-confirm-delete-modal';
import { CategoryFormModal } from './_components/category-form-modal';

export function AdminCategoriesPage() {
  const { messages } = useLocale();
  const labels = messages.admin;
  const categories = useAdminCategoriesStore((s) => s.categories);
  const addCategory = useAdminCategoriesStore((s) => s.add);
  const updateCategory = useAdminCategoriesStore((s) => s.update);
  const removeCategory = useAdminCategoriesStore((s) => s.remove);

  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCategory | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (category: AdminCategory) => {
    setEditing(category);
    setModalOpen(true);
  };

  const openDelete = (category: AdminCategory) => {
    setDeleteTarget(category);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      removeCategory(deleteTarget.slug);
    }
  };

  const handleSubmit = (input: AdminCategory) => {
    if (editing) {
      return updateCategory(editing.slug, input);
    }
    return addCategory(input);
  };

  return (
    <AdminContentCard
      title={labels.categoriesTitle}
      headerEnd={
        <Button
          variant="primary"
          size="sm"
          className="!bg-foreground !text-background font-semibold hover:!bg-foreground/90"
          onPress={openCreate}
        >
          <Icon icon="lucide:plus" width={18} height={18} aria-hidden />
          <span className="ms-1">{labels.addCategory}</span>
        </Button>
      }
    >
      {!mounted ? (
        <div className="flex justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-surface-secondary text-muted">
            <Icon icon="lucide:tags" width={40} height={40} aria-hidden />
          </div>
          <p className="mt-6 max-w-sm text-sm text-muted">
            {labels.emptyCategories}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-muted/15 text-xs font-semibold uppercase text-muted">
                <th className="px-3 py-3 text-start">{labels.categoryName}</th>
                <th className="px-3 py-3 text-start">{labels.categorySlug}</th>
                <th className="px-3 py-3 text-end">{labels.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.slug}
                  className="border-b border-muted/10 last:border-0"
                >
                  <td className="px-3 py-3 font-medium text-foreground">
                    {category.label}
                  </td>
                  <td className="px-3 py-3 text-muted">{category.slug}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(category)}
                        aria-label={labels.edit}
                        className="rounded-lg p-2 text-muted transition hover:bg-surface-secondary hover:text-foreground"
                      >
                        <Icon
                          icon="lucide:pencil"
                          width={18}
                          height={18}
                          aria-hidden
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => openDelete(category)}
                        aria-label={labels.delete}
                        className="rounded-lg p-2 text-muted transition hover:bg-red-500/10 hover:text-red-600"
                      >
                        <Icon
                          icon="lucide:trash-2"
                          width={18}
                          height={18}
                          aria-hidden
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CategoryFormModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        category={editing}
        onSubmit={handleSubmit}
      />

      <AdminConfirmDeleteModal
        isOpen={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        itemName={deleteTarget?.label}
        onConfirm={confirmDelete}
      />
    </AdminContentCard>
  );
}
