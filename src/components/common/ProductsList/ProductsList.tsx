import type { Product } from '@/types/Product';
import { ProductCard } from '@/components/common/ProductCard';
import styles from './ProductsList.module.scss';
import type React from 'react';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div
          className={styles.card}
          key={product.itemId}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
