import { apiFetch } from '@/lib/api/client';
import type {
  AddressDto,
  AddressInputDto,
  AddressesListResponse,
} from '@/app/checkout/_lib/api/addresses/types';

export function fetchAddresses() {
  return apiFetch<AddressesListResponse>('/profile/addresses/api');
}

export function createAddress(input: AddressInputDto) {
  return apiFetch<AddressDto>('/profile/addresses/api', {
    method: 'POST',
    body: input,
  });
}

export function updateAddress(id: string, input: Partial<AddressInputDto>) {
  return apiFetch<AddressDto>(`/profile/addresses/api/${id}`, {
    method: 'PATCH',
    body: input,
  });
}

export function deleteAddress(id: string) {
  return apiFetch<void>(`/profile/addresses/api/${id}`, {
    method: 'DELETE',
  });
}
