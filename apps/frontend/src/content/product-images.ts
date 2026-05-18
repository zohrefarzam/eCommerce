import iphoneImage from '@/assets/images/products/Iphone14.png';
import cameraImage from '@/assets/images/products/camera.png';
import smartwatchImage from '@/assets/images/products/smartwatch.png';
import headphoneImage from '@/assets/images/products/headphone.png';

/** Reusable product imagery — local assets where available, curated remote URLs otherwise. */
export const productImages = {
  phone: {
    src: iphoneImage.src,
    alt: 'گوشی هوشمند',
  },
  camera: {
    src: cameraImage.src,
    alt: 'دوربین',
  },
  watch: {
    src: smartwatchImage.src,
    alt: 'ساعت هوشمند',
  },
  headphone: {
    src: headphoneImage.src,
    alt: 'هدفون',
  },
  laptop: {
    src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    alt: 'لپ‌تاپ',
  },
  gaming: {
    src: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
    alt: 'کنسول بازی',
  },
  tablet: {
    src: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    alt: 'تبلت',
  },
  speaker: {
    src: 'https://images.unsplash.com/photo-1608043153459-42b4c22a8b0b?w=800&auto=format&fit=crop&q=80',
    alt: 'اسپیکر',
  },
  keyboard: {
    src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    alt: 'کیبورد',
  },
  mouse: {
    src: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    alt: 'ماوس',
  },
  powerbank: {
    src: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80',
    alt: 'پاوربانک',
  },
  earbuds: {
    src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    alt: 'ایربادز',
  },
} as const;

export type ProductImageKey = keyof typeof productImages;
