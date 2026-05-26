import iphoneProduct from '@/assets/images/products/Iphone14.png';
import cameraProduct from '@/assets/images/products/camera.png';
import smartwatchProduct from '@/assets/images/products/smartwatch.png';
import headphoneProduct from '@/assets/images/products/headphone.png';
import speakerProduct from '@/assets/images/products/speaker.png';
import palystaytionProduct from '@/assets/images/products/palystaytion.png';
import headphone2Product from '@/assets/images/products/headphone2.png';
import type { ImageSource } from '@/lib/image-source';
import { hiResRemoteImageUrl } from '@/lib/image-source';

const unsplash = (id: string, width = 800) =>
  hiResRemoteImageUrl(`https://images.unsplash.com/${id}`, width, 90);

const unsplashHiRes = (id: string) => unsplash(id, 1200);

/** Verified angles for smartphone PDP galleries (thumbnail selector). */
export const phoneGalleryPhotoIds = [
  'photo-1592750475338-74b7b21085ab',
  'photo-1511707171634-5f897ff02aa9',
  'photo-1523275335684-37898b6baf30',
  'photo-1616348436168-de43ad0db179',
] as const;

export function phoneGalleryImageSources(): ImageSource[] {
  return phoneGalleryPhotoIds.map((id) => unsplashHiRes(id));
}

/**
 * PDP gallery sources — static imports + verified remote URLs only (no 404s).
 * Listing cards keep small `productImageUrls` paths.
 */
export const productGallerySources = {
  phone: unsplashHiRes('photo-1592750475338-74b7b21085ab'),
  camera: cameraProduct,
  smartwatch: smartwatchProduct,
  headphone: headphoneProduct,
  headphone2: headphone2Product,
  speaker: speakerProduct,
  gamingConsole: palystaytionProduct,
  foldPhone: unsplashHiRes('photo-1616348436168-de43ad0db179'),
  tablet: unsplashHiRes('photo-1544244015-0df4b3ffc6b0'),
  earbuds: unsplashHiRes('photo-1505740420928-5e560c06d30e'),
  laptop: unsplashHiRes('photo-1517336714731-489689fd1ca8'),
  mirrorlessCamera: cameraProduct,
  powerBank: unsplashHiRes('photo-1609091839311-d5365f9ff1c5'),
  keyboard: unsplashHiRes('photo-1587829741301-dc798b83add3'),
  mouse: unsplashHiRes('photo-1527864550417-7fd91fc51a46'),
  smartSpeaker: unsplashHiRes('photo-1543512214-318c7553f230'),
  gamingLaptop: unsplashHiRes('photo-1603302576837-37561b2e2302'),
  studioHeadphones: unsplashHiRes('photo-1484704849700-f032a568e944'),
} as const satisfies Record<string, ImageSource>;

/** Local assets + curated remote URLs for product cards. */
export const productImageUrls = {
  phone: iphoneProduct.src,
  camera: cameraProduct.src,
  smartwatch: smartwatchProduct.src,
  headphone: headphoneProduct.src,
  foldPhone: unsplash('photo-1616348436168-de43ad0db179', 800),
  tablet: unsplash('photo-1544244015-0df4b3ffc6b0', 800),
  earbuds: unsplash('photo-1505740420928-5e560c06d30e', 800),
  laptop: unsplash('photo-1517336714731-489689fd1ca8', 800),
  gamingConsole: palystaytionProduct.src,
  headphone2: headphone2Product.src,
  speaker: speakerProduct.src,
  mirrorlessCamera: unsplash('photo-1484704849700-f032a568e944', 800),
  powerBank: unsplash('photo-1609091839311-d5365f9ff1c5', 800),
  keyboard: unsplash('photo-1587829741301-dc798b83add3', 800),
  mouse: unsplash('photo-1527864550417-7fd91fc51a46', 800),
  smartSpeaker: unsplash('photo-1543512214-318c7553f230', 800),
  gamingLaptop: unsplash('photo-1603302576837-37561b2e2302', 800),
  studioHeadphones: unsplash('photo-1484704849700-f032a568e944', 800),
} as const;

const cardUrlToGallerySource: Record<string, ImageSource> = {
  [iphoneProduct.src]: productGallerySources.phone,
  [cameraProduct.src]: productGallerySources.camera,
  [smartwatchProduct.src]: productGallerySources.smartwatch,
  [headphoneProduct.src]: productGallerySources.headphone,
  [headphone2Product.src]: productGallerySources.headphone2,
  [speakerProduct.src]: productGallerySources.speaker,
  [palystaytionProduct.src]: productGallerySources.gamingConsole,
  [productImageUrls.foldPhone]: productGallerySources.foldPhone,
  [productImageUrls.tablet]: productGallerySources.tablet,
  [productImageUrls.earbuds]: productGallerySources.earbuds,
  [productImageUrls.laptop]: productGallerySources.laptop,
  [productImageUrls.mirrorlessCamera]: productGallerySources.mirrorlessCamera,
  [productImageUrls.powerBank]: productGallerySources.powerBank,
  [productImageUrls.keyboard]: productGallerySources.keyboard,
  [productImageUrls.mouse]: productGallerySources.mouse,
  [productImageUrls.smartSpeaker]: productGallerySources.smartSpeaker,
  [productImageUrls.gamingLaptop]: productGallerySources.gamingLaptop,
  [productImageUrls.studioHeadphones]: productGallerySources.studioHeadphones,
};

/** Resolve a PDP gallery source from a listing card image URL. */
export function gallerySourceForCardImage(cardImageUrl: string): ImageSource {
  const mapped = cardUrlToGallerySource[cardImageUrl];
  if (mapped) return mapped;
  if (/^https?:\/\//i.test(cardImageUrl)) {
    return hiResRemoteImageUrl(cardImageUrl, 1200, 90);
  }
  return productGallerySources.phone;
}

export {
  cameraProduct,
  headphoneProduct,
  palystaytionProduct,
  smartwatchProduct,
};
