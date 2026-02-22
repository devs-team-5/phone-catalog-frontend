import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import type { Product } from '@/types/Product';
import { getSuggestedProducts } from '@/api/products';
import { ProductSlider } from '@/components/common/ProductSlider';

export const RecommendedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSuggestedProducts().then(setProducts);
  }, []);

  return (
    <ProductSlider
      products={products}
      title={'You may also like'}
    />
  );
};
