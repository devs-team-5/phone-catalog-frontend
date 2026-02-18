import { getImageUrl } from '@/api/products';

export const STATIC_IMAGES = {
  categories: {
    phones: getImageUrl('category-phones-clean.png'),
    tablets: getImageUrl('category-tablets-clean.png'),
    accessories: getImageUrl('category-accessories-clean.png'),
  },
  banners: {
    homeSlider: [
      getImageUrl('banner-accessories.png'),
      getImageUrl('banner-phones.png'),
      getImageUrl('banner-tablets.png'),
    ],
  },
  placeholders: {
    noImage: getImageUrl('product-not-found.png'),
    pageNotFound: getImageUrl('page-not-found.png'),
    emptyCart: getImageUrl('cart-is-empty.png'),
  },
  videos: {
    phones: getImageUrl('videos/animation_phones.mp4'),
    tablets: getImageUrl('videos/animation_tablets.mp4'),
    accessories: getImageUrl('videos/animation_accessories.mp4'),
  },
} as const;
