export const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/blog", label: "وبلاگ" },
] as const;

export const categoryBarItems = [
  { slug: "phones", label: "موبایل" },
  { slug: "computers", label: "کامپیوتر" },
  { slug: "watches", label: "ساعت هوشمند" },
  { slug: "cameras", label: "دوربین" },
  { slug: "headphones", label: "هدفون" },
  { slug: "gaming", label: "گیمینگ" },
] as const;

export const browseCategories = [
  { slug: "phones", label: "موبایل" },
  { slug: "watches", label: "ساعت" },
  { slug: "cameras", label: "دوربین" },
  { slug: "headphones", label: "هدفون" },
  { slug: "computers", label: "کامپیوتر" },
  { slug: "gaming", label: "گیمینگ" },
] as const;

export const productTabs = [
  { id: "new", label: "جدیدترین‌ها" },
  { id: "bestseller", label: "پرفروش‌ها" },
  { id: "featured", label: "منتخب" },
] as const;

export type ProductTabId = (typeof productTabs)[number]["id"];

export const productsByTab: Record<
  ProductTabId,
  { id: string; name: string; price: string }[]
> = {
  new: [
    { id: "1", name: "گوشی هوشمند ایکس", price: "۲۴٫۹۰۰٫۰۰۰ تومان" },
    { id: "2", name: "هدفون بی‌سیم پرو", price: "۳٫۵۰۰٫۰۰۰ تومان" },
    { id: "3", name: "ساعت هوشمند اسپرت", price: "۸٫۹۰۰٫۰۰۰ تومان" },
    { id: "4", name: "دوربین دیجیتال زوم", price: "۱۸٫۲۰۰٫۰۰۰ تومان" },
  ],
  bestseller: [
    { id: "5", name: "لپ‌تاپ اولترابوک", price: "۴۵٫۰۰۰٫۰۰۰ تومان" },
    { id: "6", name: "کنسول بازی نسل جدید", price: "۲۲٫۰۰۰٫۰۰۰ تومان" },
    { id: "7", name: "هدست گیمینگ آر جی‌بی", price: "۴٫۸۰۰٫۰۰۰ تومان" },
    { id: "8", name: "اسپیکر بلوتوثی", price: "۲٫۱۰۰٫۰۰۰ تومان" },
  ],
  featured: [
    { id: "9", name: "تبلت ۱۱ اینچی", price: "۱۴٫۵۰۰٫۰۰۰ تومان" },
    { id: "10", name: "پاوربانک فست شارژ", price: "۱٫۲۵۰٫۰۰۰ تومان" },
    { id: "11", name: "کیبورد مکانیکال", price: "۳٫۹۰۰٫۰۰۰ تومان" },
    { id: "12", name: "ماوس ارگونومیک", price: "۱٫۸۰۰٫۰۰۰ تومان" },
  ],
};

export const heroContent = {
  eyebrow: "حرفه‌ای. فراتر.",
  title: "آیفون ۱۴ پرو",
  description:
    "طراحی شده تا همه‌چیز را برای همه، بهتر کند.",
  cta: "خرید",
} as const;

export const promoBanners = [
  {
    id: "ps5",
    title: "پلی‌استیشن ۵",
    description: "تجربه نسل جدید بازی‌ها.",
    align: "image-start" as const,
    tone: "light" as const,
  },
  {
    id: "macbook",
    title: "مک‌بوک ایر",
    description: "قدرتمند. سبک. آماده حرکت.",
    align: "image-end" as const,
    tone: "muted" as const,
    cta: "خرید",
  },
] as const;
