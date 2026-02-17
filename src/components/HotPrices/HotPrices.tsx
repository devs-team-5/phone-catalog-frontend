import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './HotPrices.module.scss';
import type { Product } from '@/types/Product';
import { getHotProducts } from '@/api/products';
import { ProductSlider } from '../ProductSlider';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotProducts().then(setProducts);
  }, []);

  return (
    <div className={styles.container}>
      <ProductSlider
        products={products}
        title={'Hot Prices'}
      />
    </div>
  );
};
