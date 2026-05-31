import { createDefaultAddresses } from '@/app/checkout/_lib/checkout-data';
import type {
  AddressDto,
  AddressInputDto,
} from '@/app/checkout/_lib/api/addresses/types';
import type { Locale } from '@/i18n/config';

/** In-memory mock store — mutations persist until the dev server restarts. */
const addressesByLocale = new Map<Locale, AddressDto[]>();

function getLocaleStore(locale: Locale): AddressDto[] {
  let list = addressesByLocale.get(locale);
  if (!list) {
    list = createDefaultAddresses(locale);
    addressesByLocale.set(locale, list);
  }
  return list;
}

export function listMockAddresses(locale: Locale): AddressDto[] {
  return [...getLocaleStore(locale)];
}

export function findMockAddress(
  locale: Locale,
  id: string,
): AddressDto | undefined {
  return getLocaleStore(locale).find((item) => item.id === id);
}

export function createMockAddress(
  locale: Locale,
  input: AddressInputDto,
): AddressDto {
  const created: AddressDto = {
    ...input,
    id: `addr-${Date.now()}`,
  };
  const list = getLocaleStore(locale);
  list.push(created);
  return created;
}

export function updateMockAddress(
  locale: Locale,
  id: string,
  input: Partial<AddressInputDto>,
): AddressDto | undefined {
  const list = getLocaleStore(locale);
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  const updated = { ...list[index], ...input, id };
  list[index] = updated;
  return updated;
}

export function deleteMockAddress(locale: Locale, id: string): boolean {
  const list = getLocaleStore(locale);
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) return false;
  list.splice(index, 1);
  return true;
}
