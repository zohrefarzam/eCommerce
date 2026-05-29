import { redirect } from 'next/navigation';

export default function AccountFavoritesRedirect() {
  redirect('/profile/favorites');
}
