import { redirect } from 'next/navigation';

export default function AccountAddressesRedirect() {
  redirect('/profile/addresses');
}
