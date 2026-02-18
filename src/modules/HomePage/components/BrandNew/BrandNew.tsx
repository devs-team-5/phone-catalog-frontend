import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import type { Product } from '@/types/Product';
import { getNewProducts } from '@/api/products';
import { ProductSlider } from '@/components/common/ProductSlider';

export const BrandNew = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getNewProducts().then(setProducts);
  }, []);

  return (
    <ProductSlider
      products={products}
      title={'Brand new models'}
    />
  );
};
