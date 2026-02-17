import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import type { Product } from '@/types/Product';
import { getHotProducts } from '@/api/products';
import { ProductSlider } from '../ProductSlider';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotProducts().then(setProducts);
  }, []);

  return <ProductSlider products={products} />;
};
