import type React from 'react';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className={styles.product}>
      <Skeleton className={styles.image} />

      <div className={styles.titleContainer}>
        <Skeleton className={styles.titleLine} />
        <Skeleton className={styles.titleLineShort} />
      </div>

      <div className={styles.priceContainer}>
        <Skeleton className={styles.price} />
      </div>

      <hr className={styles.separateLine} />

      <div className={styles.details}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className={styles.details__container}
            key={index}
          >
            <Skeleton className={styles.label} />
            <Skeleton className={styles.value} />
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <Skeleton className={styles.button} />
        <Skeleton className={styles.favorite} />
      </div>
    </div>
  );
};
