import iphoneProduct from '@/assets/images/products/Iphone14.png';
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
    'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80',
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

export {
  cameraProduct,
  headphoneProduct,
  palystaytionProduct,
  smartwatchProduct,
};
