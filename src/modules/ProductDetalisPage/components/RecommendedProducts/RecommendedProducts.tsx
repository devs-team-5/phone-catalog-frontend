import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import type { Product } from '@/types/Product';
import { getSuggestedProducts } from '@/api/products';
import { ProductSlider } from '@/components/common/ProductSlider';

export const RecommendedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getSuggestedProducts();
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
      title={'welcome.recomends'}
      isLoading={isLoading}
    />
  );
};
