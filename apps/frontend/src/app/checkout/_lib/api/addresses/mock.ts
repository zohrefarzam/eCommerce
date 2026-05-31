import { listMockAddresses } from '@/app/checkout/_lib/api/addresses/mock-store';
import type { AddressesListResponse } from '@/app/checkout/_lib/api/addresses/types';
import type { Locale } from '@/i18n/config';

export function mockAddressesList(locale: Locale): AddressesListResponse {
  return {
    data: listMockAddresses(locale),
  };
}
