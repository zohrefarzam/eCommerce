'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/base/button';
import { useAuth } from '@/providers/auth-provider';

type CheckoutAuthButtonProps = {
  label: string;
  disabled?: boolean;
  className?: string;
};

export function CheckoutAuthButton({
  label,
  disabled,
  className,
}: CheckoutAuthButtonProps) {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();

  const handlePress = () => {
    if (!isReady) return;
    if (isAuthenticated) {
      router.push('/checkout');
      return;
    }
    router.push(`/auth/login?returnUrl=${encodeURIComponent('/checkout')}`);
  };

  return (
    <Button
      variant="primary"
      fullWidth
      className={className}
      isDisabled={disabled || !isReady}
      onPress={handlePress}
    >
      {label}
    </Button>
  );
}
