'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addressesQueryKeys } from '@/app/checkout/_lib/api/addresses/query-keys';
import {
  createAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from '@/app/checkout/_lib/api/addresses/service';
import type { AddressInputDto } from '@/app/checkout/_lib/api/addresses/types';
import { useLocale } from '@/i18n';

export function useAddressesQuery() {
  const { locale } = useLocale();

  return useQuery({
    queryKey: addressesQueryKeys.list(locale),
    queryFn: fetchAddresses,
  });
}

export function useCreateAddressMutation() {
  const queryClient = useQueryClient();
  const { locale } = useLocale();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressesQueryKeys.list(locale),
      });
    },
  });
}

export function useUpdateAddressMutation() {
  const queryClient = useQueryClient();
  const { locale } = useLocale();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: Partial<AddressInputDto>;
    }) => updateAddress(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressesQueryKeys.list(locale),
      });
    },
  });
}

export function useDeleteAddressMutation() {
  const queryClient = useQueryClient();
  const { locale } = useLocale();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressesQueryKeys.list(locale),
      });
    },
  });
}
