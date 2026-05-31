import type { Messages } from '@/i18n';

type AdminLabelKey = keyof Messages['admin'];

export const ADMIN_NAV = [
  {
    href: '/admin',
    icon: 'lucide:layout-dashboard',
    labelKey: 'navOverview' as AdminLabelKey,
  },
  {
    href: '/admin/products',
    icon: 'lucide:package',
    labelKey: 'navProducts' as AdminLabelKey,
  },
  {
    href: '/admin/orders',
    icon: 'lucide:shopping-bag',
    labelKey: 'navOrders' as AdminLabelKey,
  },
  {
    href: '/admin/users',
    icon: 'lucide:users',
    labelKey: 'navUsers' as AdminLabelKey,
  },
  {
    href: '/admin/categories',
    icon: 'lucide:tags',
    labelKey: 'navCategories' as AdminLabelKey,
  },
] as const;

export type AdminNavItem = (typeof ADMIN_NAV)[number];
