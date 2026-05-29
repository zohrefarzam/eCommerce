export const PROFILE_NAV = [
  {
    href: '/profile/orders',
    icon: 'lucide:shopping-bag',
    labelKey: 'orders' as const,
  },
  {
    href: '/profile/addresses',
    icon: 'lucide:map-pin',
    labelKey: 'addresses' as const,
  },
  {
    href: '/profile/favorites',
    icon: 'lucide:heart',
    labelKey: 'favorites' as const,
  },
] as const;

export type ProfileNavLabelKey = (typeof PROFILE_NAV)[number]['labelKey'];
