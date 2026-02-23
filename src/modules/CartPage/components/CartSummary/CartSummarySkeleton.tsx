import styles from './CartSummary.module.scss';
import skeletonStyles from './CartSummarySkeleton.module.scss';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

export const CartSummarySkeleton = () => {
  return (
    <div className={styles.summary}>
      <div className={styles.summary__total}>
        <Skeleton className={skeletonStyles.skeleton__price} />
        <Skeleton className={skeletonStyles.skeleton__text} />
      </div>

      <div className={styles.summary__divider}></div>

      <Skeleton className={skeletonStyles.skeleton__checkout} />
    </div>
  );
};
