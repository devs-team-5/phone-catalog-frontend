import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './HotPrices.module.scss';
import type { Product } from '@/types/Product';
import { getHotProducts } from '@/api/products';
import { ProductSlider } from '@/components/common/ProductSlider';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHotProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getHotProducts();
        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotProducts();
  }, []);

  return (
    <div className={styles.container}>
      <ProductSlider
        products={products}
        title={'products.hotPrices'}
        isLoading={isLoading}
      />
    </div>
  );
};
