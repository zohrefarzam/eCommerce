import type { Locale } from '@/i18n/config';
import type { ImageSource } from '@/components/base/_lib/image-source';
import { phoneGalleryImageSources } from '@/landing/_content/shared';

export type RatingBreakdownItem = {
  id: string;
  label: string;
  count: number;
};

export type ProductReview = {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  date: string;
  body: string;
  images?: readonly ImageSource[];
};

export type ProductReviewsData = {
  averageRating: number;
  totalReviews: number;
  breakdown: readonly RatingBreakdownItem[];
  reviews: readonly ProductReview[];
};

const reviewsEn: ProductReviewsData = {
  averageRating: 4.8,
  totalReviews: 125,
  breakdown: [
    { id: 'excellent', label: 'Excellent', count: 100 },
    { id: 'good', label: 'Good', count: 11 },
    { id: 'average', label: 'Average', count: 3 },
    { id: 'below', label: 'Below Average', count: 8 },
    { id: 'poor', label: 'Poor', count: 1 },
  ],
  reviews: [
    {
      id: '1',
      author: 'Grace Carey',
      avatarUrl: 'https://i.pravatar.cc/96?img=5',
      rating: 5,
      date: '24 January 2023',
      body: 'I was a bit nervous to be buying a phone again online, but it went better than I expected. The phone arrived quickly, was well packaged, and in great condition.',
    },
    {
      id: '2',
      author: 'Ronald Richards',
      avatarUrl: 'https://i.pravatar.cc/96?img=12',
      rating: 5,
      date: '24 January 2023',
      body: 'This phone has 1T storage and is excellent for my business and lifestyle needs. The triple camera system shoots amazing photos and videos.',
    },
    {
      id: '3',
      author: 'Darcy King',
      avatarUrl: 'https://i.pravatar.cc/96?img=32',
      rating: 5,
      date: '24 January 2023',
      body: 'I bought it for my daughter and she loves it. The build quality feels premium and the battery easily lasts a full day.',
      images: phoneGalleryImageSources().slice(0, 2),
    },
    {
      id: '4',
      author: 'John Malcolm',
      avatarUrl: 'https://i.pravatar.cc/96?img=68',
      rating: 5,
      date: '24 January 2023',
      body: 'Fast delivery, authentic product, and smooth performance. Would recommend to anyone upgrading from an older model.',
    },
    {
      id: '5',
      author: 'Sofia Nguyen',
      avatarUrl: 'https://i.pravatar.cc/96?img=47',
      rating: 4,
      date: '12 January 2023',
      body: 'Great phone overall. The display is stunning and apps run smoothly. I only wish the charger was included in the box.',
    },
    {
      id: '6',
      author: 'Omar Hassan',
      avatarUrl: 'https://i.pravatar.cc/96?img=15',
      rating: 5,
      date: '3 January 2023',
      body: 'Excellent customer service and the device matched the description perfectly. Very happy with my purchase.',
    },
  ],
};

const reviewsFa: ProductReviewsData = {
  averageRating: 4.8,
  totalReviews: 125,
  breakdown: [
    { id: 'excellent', label: 'عالی', count: 100 },
    { id: 'good', label: 'خوب', count: 11 },
    { id: 'average', label: 'متوسط', count: 3 },
    { id: 'below', label: 'زیر متوسط', count: 8 },
    { id: 'poor', label: 'ضعیف', count: 1 },
  ],
  reviews: [
    {
      id: '1',
      author: 'گریس کری',
      avatarUrl: 'https://i.pravatar.cc/96?img=5',
      rating: 5,
      date: '۳ بهمن ۱۴۰۱',
      body: 'خرید آنلاین گوشی برایم استرس‌زا بود، اما بهتر از انتظار پیش رفت. بسته‌بندی عالی بود و دستگاه سالم رسید.',
    },
    {
      id: '2',
      author: 'رونالد ریچاردز',
      avatarUrl: 'https://i.pravatar.cc/96?img=12',
      rating: 5,
      date: '۳ بهمن ۱۴۰۱',
      body: 'حافظه یک ترابایتی برای کار و استفاده روزمره عالی است. دوربین سه‌گانه عکس و ویدیو فوق‌العاده می‌گیرد.',
    },
    {
      id: '3',
      author: 'دارسی کینگ',
      avatarUrl: 'https://i.pravatar.cc/96?img=32',
      rating: 5,
      date: '۳ بهمن ۱۴۰۱',
      body: 'برای دخترم خریدم و خیلی راضی است. کیفیت ساخت لوکس است و باتری یک روز کامل دوام می‌آورد.',
      images: phoneGalleryImageSources().slice(0, 2),
    },
    {
      id: '4',
      author: 'جان مالکلم',
      avatarUrl: 'https://i.pravatar.cc/96?img=68',
      rating: 5,
      date: '۳ بهمن ۱۴۰۱',
      body: 'ارسال سریع، محصول اصل و عملکرد روان. برای ارتقا از مدل قدیمی‌تر پیشنهاد می‌کنم.',
    },
    {
      id: '5',
      author: 'سوفیا نگوین',
      avatarUrl: 'https://i.pravatar.cc/96?img=47',
      rating: 4,
      date: '۲۲ دی ۱۴۰۱',
      body: 'گوشی عالی است. نمایشگر خیره‌کننده است و برنامه‌ها روان اجرا می‌شوند. فقط دوست داشتم شارژر داخل جعبه بود.',
    },
    {
      id: '6',
      author: 'عمر حسن',
      avatarUrl: 'https://i.pravatar.cc/96?img=15',
      rating: 5,
      date: '۱۳ دی ۱۴۰۱',
      body: 'پشتیبانی عالی و دستگاه دقیقاً مطابق توضیحات بود. از خرید بسیار راضی هستم.',
    },
  ],
};

const reviewsByLocale: Record<Locale, ProductReviewsData> = {
  en: reviewsEn,
  fa: reviewsFa,
};

export function getProductReviews(locale: Locale): ProductReviewsData {
  return reviewsByLocale[locale];
}
