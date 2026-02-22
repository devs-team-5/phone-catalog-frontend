import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import type { Product } from '@/types/Product';
import { getNewProducts } from '@/api/products';
import { ProductSlider } from '@/components/common/ProductSlider';

export const BrandNew = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getNewProducts();
        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  return (
    <ProductSlider
      products={products}
      title={'Brand new models'}
      isLoading={isLoading}
    />
  );
};
