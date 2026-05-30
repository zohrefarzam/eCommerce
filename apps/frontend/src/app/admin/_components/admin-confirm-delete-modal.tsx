'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { useLocale } from '@/i18n';

type AdminConfirmDeleteModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  itemName?: string;
  onConfirm: () => void;
};

export function AdminConfirmDeleteModal({
  isOpen,
  onOpenChange,
  itemName,
  onConfirm,
}: AdminConfirmDeleteModalProps) {
  const { messages } = useLocale();
  const labels = messages.admin;

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={labels.confirmDeleteTitle}
      hideHeader
      placement="center"
      className="sm:!max-w-md"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
            <Icon
              icon="lucide:triangle-alert"
              width={22}
              height={22}
              aria-hidden
            />
          </div>
          <div className="flex flex-col gap-1 pt-0.5">
            <p className="text-sm text-foreground">{labels.confirmDelete}</p>
            {itemName ? (
              <p className="text-sm font-semibold text-foreground">
                {itemName}
              </p>
            ) : null}
          </div>
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
            type="button"
            variant="primary"
            className="h-11 rounded-xl !bg-red-600 !text-white font-semibold hover:!bg-red-700 sm:min-w-28"
            onPress={handleConfirm}
          >
            {labels.delete}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
