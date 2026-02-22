import styles from './CartItem.module.scss';
import skeletonStyles from './CartItemSkeleton.module.scss';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

export const CartItemSkeleton = () => {
  return (
    <article className={`${styles.item} ${skeletonStyles.skeleton}`}>
      <div className={styles.item__info}>
        <Skeleton className={skeletonStyles.skeleton__remove} />
        <div className={styles.item__img_wrapper}>
          <Skeleton className={skeletonStyles.skeleton__img} />
        </div>
        <Skeleton className={skeletonStyles.skeleton__name} />
      </div>
      <div className={styles.item__actions}>
        <div className={styles.item__quantity}>
          <Skeleton className={skeletonStyles.skeleton__btn} />
          <Skeleton className={skeletonStyles.skeleton__count} />
          <Skeleton className={skeletonStyles.skeleton__btn} />
        </div>
        <Skeleton className={skeletonStyles.skeleton__price} />
      </div>
    </article>
  );
};
