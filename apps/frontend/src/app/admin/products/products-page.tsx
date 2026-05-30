'use client';

import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/base/button';
import { useLocale } from '@/i18n';
import { useAdminCategoriesStore } from '@/lib/admin-categories-store';
import {
  useAdminProductsStore,
  type AdminProduct,
  type AdminProductInput,
} from '@/lib/admin-products-store';
import { AdminContentCard } from '../_components/admin-shell';
import { AdminConfirmDeleteModal } from '../_components/admin-confirm-delete-modal';
import { ProductFormModal } from './_components/product-form-modal';

export function AdminProductsPage() {
  const { messages } = useLocale();
  const labels = messages.admin;
  const products = useAdminProductsStore((s) => s.products);
  const addProduct = useAdminProductsStore((s) => s.add);
  const updateProduct = useAdminProductsStore((s) => s.update);
  const removeProduct = useAdminProductsStore((s) => s.remove);
  const categories = useAdminCategoriesStore((s) => s.categories);

  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryLabelBySlug = useMemo(() => {
    const map = new Map<string, string>();
    for (const category of categories) map.set(category.slug, category.label);
    return map;
  }, [categories]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedProducts = useMemo(
    () => products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [products, page],
  );

  const rangeStart = products.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, products.length);

  const fillerRows =
    products.length > PAGE_SIZE ? PAGE_SIZE - paginatedProducts.length : 0;

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (product: AdminProduct) => {
    setEditing(product);
    setModalOpen(true);
  };

  const openDelete = (product: AdminProduct) => {
    setDeleteTarget(product);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      removeProduct(deleteTarget.id);
    }
  };

  const handleSubmit = (input: AdminProductInput) => {
    if (editing) {
      updateProduct(editing.id, input);
    } else {
      addProduct(input);
    }
  };

  return (
    <AdminContentCard
      title={labels.productsTitle}
      headerEnd={
        <Button
          variant="primary"
          size="sm"
          className="!bg-foreground !text-background font-semibold hover:!bg-foreground/90"
          onPress={openCreate}
        >
          <Icon icon="lucide:plus" width={18} height={18} aria-hidden />
          <span className="ms-1">{labels.addProduct}</span>
        </Button>
      }
    >
      {!mounted ? (
        <div className="flex justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-surface-secondary text-muted">
            <Icon icon="lucide:package" width={40} height={40} aria-hidden />
          </div>
          <p className="mt-6 max-w-sm text-sm text-muted">
            {labels.emptyProducts}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-muted/15 text-start text-xs font-semibold uppercase text-muted">
                <th className="px-3 py-3 text-start">{labels.productName}</th>
                <th className="px-3 py-3 text-start">{labels.productPrice}</th>
                <th className="px-3 py-3 text-start">{labels.productBrand}</th>
                <th className="px-3 py-3 text-start">
                  {labels.productCategory}
                </th>
                <th className="px-3 py-3 text-end">{labels.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-muted/10 last:border-0"
                >
                  <td className="px-3 py-3 font-medium text-foreground">
                    {product.name}
                  </td>
                  <td className="px-3 py-3 text-foreground">{product.price}</td>
                  <td className="px-3 py-3 text-muted">
                    {product.brand || '—'}
                  </td>
                  <td className="px-3 py-3 text-muted">
                    {categoryLabelBySlug.get(product.categorySlug) ??
                      product.categorySlug ??
                      '—'}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(product)}
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
                        onClick={() => openDelete(product)}
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
              {fillerRows > 0 &&
                Array.from({ length: fillerRows }, (_, i) => (
                  <tr key={`filler-${i}`} aria-hidden>
                    <td className="px-3 py-3" colSpan={5}>
                      <div className="h-[34px]" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-muted/15 pt-4 sm:flex-row">
            <p className="text-xs text-muted">
              {labels.paginationInfo(rangeStart, rangeEnd, products.length)}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted"
              >
                <Icon
                  icon="lucide:chevron-left"
                  width={16}
                  height={16}
                  className="rtl:hidden"
                  aria-hidden
                />
                <Icon
                  icon="lucide:chevron-right"
                  width={16}
                  height={16}
                  className="hidden rtl:block"
                  aria-hidden
                />
                <span>{labels.paginationPrev}</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    aria-current={pageNumber === page ? 'page' : undefined}
                    className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      pageNumber === page
                        ? 'bg-foreground text-background'
                        : 'text-muted hover:bg-surface-secondary hover:text-foreground'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted"
              >
                <span>{labels.paginationNext}</span>
                <Icon
                  icon="lucide:chevron-right"
                  width={16}
                  height={16}
                  className="rtl:hidden"
                  aria-hidden
                />
                <Icon
                  icon="lucide:chevron-left"
                  width={16}
                  height={16}
                  className="hidden rtl:block"
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </div>
      )}

      <ProductFormModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        product={editing}
        onSubmit={handleSubmit}
      />

      <AdminConfirmDeleteModal
        isOpen={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        itemName={deleteTarget?.name}
        onConfirm={confirmDelete}
      />
    </AdminContentCard>
  );
}
