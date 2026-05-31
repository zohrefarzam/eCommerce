import type { AddressTag } from '@/app/checkout/_lib/checkout-data';

export type AddressDto = {
  id: string;
  label: string;
  tag: AddressTag;
  recipientName: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
  phone: string;
  latitude?: number;
  longitude?: number;
};

export type AddressesListResponse = {
  data: AddressDto[];
};

export type AddressInputDto = Omit<AddressDto, 'id'>;
