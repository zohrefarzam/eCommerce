'use client';

import {
  Modal as HeroUIModal,
  type ModalRootProps as HeroUIModalProps,
} from '@heroui/react';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BaseModalProps = Omit<
  HeroUIModalProps,
  'children' | 'className'
> & {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
  /** Classes on the scrollable body region. */
  bodyClassName?: string;
  /** Hide title bar and close button (content-only dialog). */
  hideHeader?: boolean;
  /** `bottom` works well on mobile; `center` on larger screens. */
  placement?: 'auto' | 'top' | 'center' | 'bottom';
};

const backdropClass = '!bg-foreground/40';

const containerClass =
  '!mx-0 !mb-0 !w-full !max-w-none rounded-t-2xl sm:!mx-auto sm:!mb-auto sm:!max-w-lg sm:rounded-2xl';

const dialogClass = '!max-h-[min(90dvh,720px)]';

const headerClass =
  'flex items-center justify-between gap-3 border-b border-muted/15 !px-4 !py-3';

const headingClass = '!text-base !font-bold !text-foreground';

const bodyClass = '!px-4 !py-4';

export function Modal({
  isOpen,
  onOpenChange,
  title,
  children,
  className,
  bodyClassName,
  hideHeader = false,
  placement = 'bottom',
}: BaseModalProps) {
  return (
    <HeroUIModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <HeroUIModal.Backdrop className={backdropClass} isDismissable>
        <HeroUIModal.Container
          placement={placement}
          scroll="inside"
          className={cn(containerClass, className)}
        >
          <HeroUIModal.Dialog className={dialogClass} aria-label={title}>
            {hideHeader ? null : (
              <HeroUIModal.Header className={headerClass}>
                <HeroUIModal.Heading className={headingClass}>
                  {title}
                </HeroUIModal.Heading>
                <HeroUIModal.CloseTrigger />
              </HeroUIModal.Header>
            )}
            <HeroUIModal.Body
              className={cn(bodyClass, hideHeader && '!pt-5', bodyClassName)}
            >
              {children}
            </HeroUIModal.Body>
          </HeroUIModal.Dialog>
        </HeroUIModal.Container>
      </HeroUIModal.Backdrop>
    </HeroUIModal>
  );
}

Modal.displayName = 'Modal';
