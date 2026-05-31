'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/base/button';
import { Popover } from '@/components/base/popover';
import { CartLineItemRow } from '@/components/ui/cart-line-item';
import { useLocale } from '@/i18n';
import {
  selectCartTotalQuantity,
  useCartStore,
} from '@/app/cart/_lib/cart-store';
import { cn } from '@/components/base/_lib/utils';

const HOVER_CLOSE_DELAY_MS = 280;

export function CartNavDropdown() {
  const router = useRouter();
  const { messages, locale, config } = useLocale();
  const { cart: cartMessages, header } = messages;
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartCount = useCartStore(selectCartTotalQuantity);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverDepthRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      if (hoverDepthRef.current === 0) setOpen(false);
    }, HOVER_CLOSE_DELAY_MS);
  }, [cancelClose]);

  const handleHoverEnter = useCallback(() => {
    hoverDepthRef.current += 1;
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const handleHoverLeave = useCallback(() => {
    hoverDepthRef.current = Math.max(0, hoverDepthRef.current - 1);
    scheduleClose();
  }, [scheduleClose]);

  /** Menu/Dialog triggers emit `false` while moving into the portaled panel — ignore that. */
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next) {
        cancelClose();
        setOpen(true);
      }
    },
    [cancelClose],
  );

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const lineLabels = {
    removeItem: cartMessages.removeItem,
    decreaseQuantity: cartMessages.decreaseQuantity,
    increaseQuantity: cartMessages.increaseQuantity,
    quantityLabel: cartMessages.quantityLabel,
  };

  const cartLabel =
    mounted && cartCount > 0 ? `${header.cart} (${cartCount})` : header.cart;

  return (
    <Popover isOpen={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        aria-label={cartLabel}
        className={cn(
          'cart-dropdown-trigger relative rounded-lg p-2 text-foreground transition outline-none',
          'hover:bg-surface-secondary',
          'focus:outline-none focus-visible:outline-none focus-visible:!ring-0',
          'data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-0',
        )}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        onClick={() => router.push('/cart')}
      >
        <Icon
          icon="lucide:shopping-cart"
          width={22}
          height={22}
          className="shrink-0"
          aria-hidden
        />
        {mounted && cartCount > 0 ? (
          <span
            className={cn(
              'absolute -end-0.5 -top-0.5 flex min-w-4 items-center justify-center',
              'rounded-full bg-foreground px-1 py-0.5 text-[10px] font-bold leading-none text-background',
            )}
            aria-hidden
          >
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        ) : null}
      </Popover.Trigger>

      <Popover.Content
        placement={config.dir === 'rtl' ? 'bottom start' : 'bottom end'}
        offset={6}
        isNonModal
        className={cn(
          'cart-dropdown-popover',
          'w-[min(100vw-2rem,24rem)] overflow-hidden rounded-xl border border-muted/20 bg-background p-0 sm:w-[26rem]',
          'shadow-xl !outline-none !ring-0',
          'focus:outline-none focus-visible:!outline-none focus-visible:!ring-0',
          'data-[focus-visible=true]:!outline-none data-[focus-visible=true]:!ring-0',
          'data-[entering=true]:animate-none data-[exiting=true]:animate-none',
        )}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
        <Popover.Dialog className="outline-none">
          <div className="flex max-h-[min(70vh,28rem)] flex-col">
            <div className="border-b border-muted/15 px-5 py-4">
              <p className="text-sm font-bold text-foreground">
                {cartMessages.dropdownTitle}
                {mounted && cartCount > 0 ? (
                  <span className="ms-1.5 font-medium text-muted">
                    ({cartCount})
                  </span>
                ) : null}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted">
                  {cartMessages.emptyDescription}
                </p>
              ) : (
                items.map((item) => (
                  <CartLineItemRow
                    key={item.lineId}
                    item={item}
                    locale={locale}
                    labels={lineLabels}
                    variant="dropdown"
                    onRemove={removeItem}
                  />
                ))
              )}
            </div>

            <div className="border-t border-muted/15 px-5 py-4">
              <Button
                variant="primary"
                fullWidth
                className="h-10 rounded-xl !bg-foreground !text-background font-semibold"
                href="/cart"
                onPress={() => setOpen(false)}
              >
                {cartMessages.viewCart}
              </Button>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
