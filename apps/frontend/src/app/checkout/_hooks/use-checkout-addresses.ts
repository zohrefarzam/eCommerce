'use client';

import { useCallback, useEffect } from 'react';
import type { CheckoutAddressInput } from '@/app/checkout/_lib/checkout-data';
import {
  resolveSelectedAddressId,
  useCheckoutStore,
} from '@/app/checkout/_lib/checkout-store';
import {
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from '@/app/checkout/_hooks/use-addresses-query';

export function useCheckoutAddresses() {
  const selectedAddressId = useCheckoutStore((s) => s.selectedAddressId);
  const setSelectedAddressId = useCheckoutStore((s) => s.setSelectedAddressId);

  const query = useAddressesQuery();
  const createMutation = useCreateAddressMutation();
  const updateMutation = useUpdateAddressMutation();
  const deleteMutation = useDeleteAddressMutation();

  const addresses = query.data?.data ?? [];

  useEffect(() => {
    const resolved = resolveSelectedAddressId(addresses, selectedAddressId);
    if (resolved !== selectedAddressId) {
      setSelectedAddressId(resolved);
    }
  }, [addresses, selectedAddressId, setSelectedAddressId]);

  const addAddress = useCallback(
    (input: CheckoutAddressInput) => {
      createMutation.mutate(input, {
        onSuccess: (created) => setSelectedAddressId(created.id),
      });
    },
    [createMutation, setSelectedAddressId],
  );

  const updateAddress = useCallback(
    (id: string, input: CheckoutAddressInput) => {
      updateMutation.mutate({ id, input });
    },
    [updateMutation],
  );

  const removeAddress = useCallback(
    (id: string) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation],
  );

  return {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    addAddress,
    updateAddress,
    removeAddress,
    isLoading: query.isLoading,
    isError: query.isError,
    isMutating:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}
