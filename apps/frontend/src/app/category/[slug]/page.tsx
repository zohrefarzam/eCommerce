import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getLandingContent } from '@/landing/_content';
import { isValidCategorySlug } from '@/lib/product-catalog';
import { getLocaleFromCookie } from '@/i18n';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const landing = getLandingContent(locale);

  if (isValidCategorySlug(landing, slug)) {
    redirect(`/products?category=${encodeURIComponent(slug)}`);
  }

  redirect('/products');
}
