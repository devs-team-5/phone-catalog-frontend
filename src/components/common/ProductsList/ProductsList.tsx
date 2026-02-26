import type { Product } from '@/types/Product';
import {
  ProductCard,
  ProductCardSkeleton,
} from '@/components/common/ProductCard';
import styles from './ProductsList.module.scss';
import type React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  products: Product[];
  isLoading?: boolean;
  count?: number;
};

export const ProductsList: React.FC<Props> = ({
  products,
  isLoading,
  count,
}) => {
  const [searchParams] = useSearchParams();
  const perPage = count || searchParams.get('perPage') || '16';
  const skeletonCount = Number(perPage) || 16;

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            className={styles.card}
            key={`skeleton-${index}`}
          >
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

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
