import iphoneProduct from '@/assets/images/products/Iphone14.png';
import type { ImageSource } from '@/lib/image-source';
import cameraProduct from '@/assets/images/products/camera.png';
import smartwatchProduct from '@/assets/images/products/smartwatch.png';
import headphoneProduct from '@/assets/images/products/headphone.png';
import speakerProduct from '@/assets/images/products/speaker.png';
import palystaytionProduct from '@/assets/images/products/palystaytion.png';
import headphone2Product from '@/assets/images/products/headphone2.png';
/** Local assets + curated remote URLs for product cards. */
export const productImageUrls = {
  phone: iphoneProduct.src,
  camera: cameraProduct.src,
  smartwatch: smartwatchProduct.src,
  headphone: headphoneProduct.src,
  foldPhone:
    'https://images.unsplasheadphone2h.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80',
  tablet:
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
  earbuds:
    'https://images.unsplash.com/photo-1598331668826-20ceccad3bc2?w=800&auto=format&fit=crop&q=80',
  laptop:
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
  gamingConsole: palystaytionProduct.src,
  headphone2: headphone2Product.src,
  speaker: speakerProduct.src,
  mirrorlessCamera:
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc30?w=800&auto=format&fit=crop&q=80',
  powerBank:
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80',
  keyboard:
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
  mouse:
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
  smartSpeaker:
    'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80',
  gamingLaptop:
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
  studioHeadphones:
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
} as const;

export const navLinks = [
  { href: '/', label: 'خانه' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
  { href: '/blog', label: 'وبلاگ' },
] as const;

export const footerContent = {
  brand: 'هوشمندسازان',
  tagline: 'فروشگاه آنلاین محصولات دیجیتال با ارسال سریع و ضمانت اصالت کالا.',
  columns: [
    {
      title: 'شرکت',
      links: [...navLinks],
    },
    {
      title: 'پشتیبانی',
      links: [
        { href: '/faq', label: 'سوالات متداول' },
        { href: '/shipping', label: 'ارسال و تحویل' },
        { href: '/returns', label: 'مرجوعی کالا' },
        { href: '/privacy', label: 'حریم خصوصی' },
      ],
    },
  ],
  contact: {
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    email: 'info@hooshmandsazan.ir',
    address: 'تهران، خیابان ولیعصر',
  },
  social: [
    {
      href: 'https://instagram.com',
      label: 'اینستاگرام',
      icon: 'lucide:instagram',
    },
    { href: 'https://t.me', label: 'تلگرام', icon: 'lucide:send' },
    { href: 'https://linkedin.com', label: 'لینکدین', icon: 'lucide:linkedin' },
  ],
  legal: [
    { href: '/terms', label: 'قوانین و مقررات' },
    { href: '/privacy', label: 'حریم خصوصی' },
  ],
  copyright: '© ۱۴۰۵ هوشمندسازان. تمامی حقوق محفوظ است.',
} as const;

export const categoryBarItems = [
  { slug: 'phones', label: 'موبایل' },
  { slug: 'computers', label: 'کامپیوتر' },
  { slug: 'watches', label: 'ساعت هوشمند' },
  { slug: 'cameras', label: 'دوربین' },
  { slug: 'headphones', label: 'هدفون' },
  { slug: 'gaming', label: 'گیمینگ' },
] as const;

export const browseCategories = [
  { slug: 'phones', label: 'موبایل', icon: 'lucide:smartphone' },
  { slug: 'watches', label: 'ساعت هوشمند', icon: 'lucide:watch' },
  { slug: 'cameras', label: 'دوربین', icon: 'lucide:camera' },
  { slug: 'headphones', label: 'هدفون', icon: 'lucide:headphones' },
  { slug: 'computers', label: 'کامپیوتر', icon: 'lucide:monitor' },
  { slug: 'gaming', label: 'گیمینگ', icon: 'lucide:gamepad-2' },
] as const;

export const productTabs = [
  { id: 'new', label: 'جدیدترین‌ها' },
  { id: 'bestseller', label: 'پرفروش‌ها' },
  { id: 'featured', label: 'منتخب' },
] as const;

export type ProductTabId = (typeof productTabs)[number]['id'];

export type ShowcaseProduct = {
  id: string;
  name: string;
  price: string;
  compareAtPrice?: string;
  discountPercent?: number;
  image: string;
  imageAlt: string;
  defaultFavorite?: boolean;
};

export const productsByTab: Record<ProductTabId, ShowcaseProduct[]> = {
  new: [
    {
      id: '1',
      name: 'گوشی هوشمند ایکس ۱۲۸ گیگابایت',
      price: '۲۴٫۹۰۰٫۰۰۰ تومان',
      compareAtPrice: '۳۸٫۳۰۰٫۰۰۰ تومان',
      discountPercent: 35,
      image: productImageUrls.phone,
      imageAlt: 'گوشی هوشمند ایکس ۱۲۸ گیگابایت',
    },
    {
      id: '2',
      name: 'دوربین حرفه‌ای جیبی سینمایی',
      price: '۳۸٫۲۰۰٫۰۰۰ تومان',
      image: productImageUrls.camera,
      imageAlt: 'دوربین حرفه‌ای جیبی سینمایی',
    },
    {
      id: '3',
      name: 'ساعت هوشمند اسپرت سری ۹',
      price: '۸٫۹۰۰٫۰۰۰ تومان',
      image: productImageUrls.smartwatch,
      imageAlt: 'ساعت هوشمند اسپرت سری ۹',
    },
    {
      id: '4',
      name: 'هدفون بی‌سیم پرو نقره‌ای',
      price: '۱۰٫۰۱۰٫۰۰۰ تومان',
      compareAtPrice: '۱۵٫۴۰۰٫۰۰۰ تومان',
      discountPercent: 35,
      image: productImageUrls.headphone,
      imageAlt: 'هدفون بی‌سیم پرو نقره‌ای',
    },
    {
      id: '5',
      name: 'ساعت هوشمند کلاسیک ۴۷ میلی‌متر',
      price: '۹٫۸۰۰٫۰۰۰ تومان',
      image: productImageUrls.smartwatch,
      imageAlt: 'ساعت هوشمند کلاسیک ۴۷ میلی‌متر',
    },
    {
      id: '6',
      name: 'گوشی تاشو نسل جدید ۲۵۶ گیگابایت',
      price: '۴۲٫۰۰۰٫۰۰۰ تومان',
      defaultFavorite: true,
      image: productImageUrls.foldPhone,
      imageAlt: 'گوشی تاشو نسل جدید ۲۵۶ گیگابایت',
    },
    {
      id: '7',
      name: 'ایربادز بی‌سیم گرافیتی',
      price: '۲٫۹۰۰٫۰۰۰ تومان',
      compareAtPrice: '۴٫۵۰۰٫۰۰۰ تومان',
      discountPercent: 35,
      image: productImageUrls.earbuds,
      imageAlt: 'ایربادز بی‌سیم گرافیتی',
    },
    {
      id: '8',
      name: 'تبلت ۱۰.۲ اینچی ۶۴ گیگابایت',
      price: '۱۴٫۵۰۰٫۰۰۰ تومان',
      image: productImageUrls.tablet,
      imageAlt: 'تبلت ۱۰.۲ اینچی ۶۴ گیگابایت',
    },
  ],
  bestseller: [
    {
      id: 'b1',
      name: 'لپ‌تاپ اولترابوک ۱۴ اینچی',
      price: '۴۵٫۰۰۰٫۰۰۰ تومان',
      compareAtPrice: '۵۸٫۰۰۰٫۰۰۰ تومان',
      discountPercent: 22,
      image: productImageUrls.laptop,
      imageAlt: 'لپ‌تاپ اولترابوک ۱۴ اینچی',
    },
    {
      id: 'b2',
      name: 'کنسول بازی نسل جدید',
      price: '۲۲٫۰۰۰٫۰۰۰ تومان',
      image: productImageUrls.gamingConsole,
      imageAlt: 'کنسول بازی نسل جدید',
    },
    {
      id: 'b3',
      name: 'Glaxy buds',
      price: '۳٫۱۲۰٫۰۰۰ تومان',
      compareAtPrice: '۴٫۸۰۰٫۰۰۰ تومان',
      discountPercent: 35,
      image: productImageUrls.headphone2,
      imageAlt: 'Glaxy buds',
    },
    {
      id: 'b4',
      name: 'اسپیکر بلوتوثی پرتابل',
      price: '۱٫۷۸۵٫۰۰۰ تومان',
      compareAtPrice: '۲٫۱۰۰٫۰۰۰ تومان',
      discountPercent: 15,
      image: productImageUrls.speaker,
      imageAlt: 'اسپیکر بلوتوثی پرتابل',
    },
    {
      id: 'b5',
      name: 'گوشی هوشمند پرو مکس',
      price: '۲۶٫۰۰۰٫۰۰۰ تومان',
      compareAtPrice: '۳۲٫۵۰۰٫۰۰۰ تومان',
      discountPercent: 20,
      image: productImageUrls.phone,
      imageAlt: 'گوشی هوشمند پرو مکس',
    },
    {
      id: 'b6',
      name: 'ساعت هوشمند سری اسپرت',
      price: '۷٫۲۰۰٫۰۰۰ تومان',
      image: productImageUrls.smartwatch,
      imageAlt: 'ساعت هوشمند سری اسپرت',
    },
    {
      id: 'b7',
      name: 'هدفون نویز کنسلینگ',
      price: '۹٫۰۳۰٫۰۰۰ تومان',
      compareAtPrice: '۱۲٫۹۰۰٫۰۰۰ تومان',
      discountPercent: 30,
      image: productImageUrls.headphone,
      imageAlt: 'هدفون نویز کنسلینگ',
    },
    {
      id: 'b8',
      name: 'دوربین بدون آینه ۲۴ مگاپیکسل',
      price: '۳۵٫۰۰۰٫۰۰۰ تومان',
      image: productImageUrls.mirrorlessCamera,
      imageAlt: 'دوربین بدون آینه ۲۴ مگاپیکسل',
    },
  ],
  featured: [
    {
      id: 'f1',
      name: 'تبلت ۱۱ اینچی پرو',
      price: '۲۸٫۵۰۰٫۰۰۰ تومان',
      image: productImageUrls.tablet,
      imageAlt: 'تبلت ۱۱ اینچی پرو',
    },
    {
      id: 'f2',
      name: 'پاوربانک فست شارژ ۲۰ هزار',
      price: '۹۹۰٫۰۰۰ تومان',
      compareAtPrice: '۱٫۲۵۰٫۰۰۰ تومان',
      discountPercent: 21,
      image: productImageUrls.powerBank,
      imageAlt: 'پاوربانک فست شارژ ۲۰ هزار',
    },
    {
      id: 'f3',
      name: 'کیبورد مکانیکال AK-900',
      price: '۲٫۵۳۵٫۰۰۰ تومان',
      compareAtPrice: '۳٫۹۰۰٫۰۰۰ تومان',
      discountPercent: 35,
      image: productImageUrls.keyboard,
      imageAlt: 'کیبورد مکانیکال AK-900',
    },
    {
      id: 'f4',
      name: 'ماوس ارگونومیک گیمینگ',
      price: '۱٫۸۰۰٫۰۰۰ تومان',
      image: productImageUrls.mouse,
      imageAlt: 'ماوس ارگونومیک گیمینگ',
    },
    {
      id: 'f5',
      name: 'اسپیکر هوشمند خانگی',
      price: '۴٫۵۰۰٫۰۰۰ تومان',
      image: productImageUrls.smartSpeaker,
      imageAlt: 'اسپیکر هوشمند خانگی',
    },
    {
      id: 'f6',
      name: 'ساعت هوشمند بانوان',
      price: '۶٫۲۰۰٫۰۰۰ تومان',
      image: productImageUrls.smartwatch,
      imageAlt: 'ساعت هوشمند بانوان',
    },
    {
      id: 'f7',
      name: 'لپ‌تاپ گیمینگ ۱۶ اینچی',
      price: '۶۸٫۰۰۰٫۰۰۰ تومان',
      image: productImageUrls.gamingLaptop,
      imageAlt: 'لپ‌تاپ گیمینگ ۱۶ اینچی',
    },
    {
      id: 'f8',
      name: 'هدفون استودیویی سیمی',
      price: '۵٫۴۰۰٫۰۰۰ تومان',
      image: productImageUrls.studioHeadphones,
      imageAlt: 'هدفون استودیویی سیمی',
    },
  ],
};

export const heroContent = {
  eyebrow: 'حرفه‌ای. فراتر.',
  title: 'آیفون ۱۴ پرو',
  description: 'طراحی شده تا همه‌چیز را برای همه، بهتر کند.',
  cta: 'خرید',
} as const;

export const cardSwapSection = {
  title: 'پیشنهادهای ویژه، همیشه در دسترس',
  description: 'هر چند ثانیه پیشنهاد بعدی را ببینید.',
} as const;

export const cardSwapPromos = [
  {
    id: 'iphone',
    eyebrow: 'حرفه‌ای. فراتر.',
    title: 'آیفون ۱۴ پرو',
    description: 'طراحی شده تا همه‌چیز را برای همه، بهتر کند.',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'آیفون ۱۴ پرو',
    cta: 'خرید',
    href: '/products',
  },
  {
    id: 'ps5',
    eyebrow: 'گیمینگ',
    title: 'پلی‌استیشن ۵',
    description: 'تجربه نسل جدید بازی‌ها با گرافیک خیره‌کننده.',
    image:
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'پلی‌استیشن ۵',
    cta: 'مشاهده',
    href: '/category/gaming',
  },
  {
    id: 'macbook',
    eyebrow: 'محصولات اپل',
    title: 'مک‌بوک ایر',
    description: 'قدرتمند. سبک. آماده حرکت.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'مک‌بوک ایر',
    cta: 'خرید',
    href: '/products',
  },
  {
    id: 'headphones',
    eyebrow: 'صوت',
    title: 'هدفون بی‌سیم پرو',
    description: 'صدای شفاف با حذف نویز فعال برای هر محیط.',
    image: headphoneProduct.src,
    imageAlt: 'Glaxy buds',
    cta: 'خرید',
    href: '/category/headphones',
  },
  {
    id: 'watch',
    eyebrow: 'پوشیدنی',
    title: 'ساعت هوشمند سری ۹',
    description: 'سلامت، تناسب اندام و اتصال همیشگی در مچ دست.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'ساعت هوشمند سری ۹',
    cta: 'مشاهده',
    href: '/category/watches',
  },
] as const;

export type NewArrivalCategory = {
  slug: string;
  title: string;
  description: string;
  /** Static import now; API absolute URL when wired. Min widths: see `COVER_IMAGE_MIN_WIDTH`. */
  image: ImageSource;
  imageAlt: string;
  href: string;
};

export const newArrivalSection = {
  eyebrow: 'منتخب',
  title: 'تازه ها',
  shopNowLabel: 'خرید کنید',
} as const;

/** Bento grid: featured (tall) + wide + two compact — slugs match `browseCategories`. */
export const newArrivalCategories: NewArrivalCategory[] = [
  {
    slug: 'gaming',
    title: 'گیمینگ',
    description: 'کنسول‌ها، لوازم جانبی و تجهیزات حرفه‌ای بازی.',
    image: palystaytionProduct,
    imageAlt: 'کنسول بازی',
    href: '/category/gaming',
  },
  {
    slug: 'phones',
    title: 'موبایل',
    description: 'جدیدترین گوشی‌های هوشمند با پیشنهادهای ویژه.',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1400&auto=format&fit=crop&q=90',
    imageAlt: 'گوشی هوشمند',
    href: '/category/phones',
  },
  {
    slug: 'headphones',
    title: 'هدفون',
    description: 'هدفون و اسپیکرهای بی‌سیم با کیفیت بالا.',
    image: headphoneProduct,
    imageAlt: 'هدفون بی‌سیم',
    href: '/category/headphones',
  },
  {
    slug: 'watches',
    title: 'ساعت هوشمند',
    description: 'پوشیدنی‌های هوشمند برای سبک زندگی مدرن.',
    image: smartwatchProduct,
    imageAlt: 'ساعت هوشمند',
    href: '/category/watches',
  },
];

export const serviceHighlights = [
  {
    id: 'delivery',
    icon: 'lucide:truck',
    title: 'ارسال رایگان و سریع',
    description: 'ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان',
  },
  {
    id: 'support',
    icon: 'lucide:headset',
    title: 'پشتیبانی ۲۴ ساعته',
    description: 'پشتیبانی دوستانه در تمام ساعات شبانه‌روز',
  },
  {
    id: 'guarantee',
    icon: 'lucide:shield-check',
    title: 'ضمانت بازگشت وجه',
    description: 'بازگشت وجه تا ۳۰ روز پس از خرید',
  },
] as const;

export const promoBanners = [
  {
    id: 'ps5',
    title: 'پلی‌استیشن ۵',
    description: 'تجربه نسل جدید بازی‌ها.',
    align: 'image-start' as const,
    tone: 'light' as const,
  },
  {
    id: 'macbook',
    title: 'مک‌بوک ایر',
    description: 'قدرتمند. سبک. آماده حرکت.',
    align: 'image-end' as const,
    tone: 'muted' as const,
    cta: 'خرید',
  },
] as const;
