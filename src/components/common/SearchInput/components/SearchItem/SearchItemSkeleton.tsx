import styles from './SearchItemSkeleton.module.scss';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

export const SearchItemSkeleton = () => {
  return (
    <article className={styles.item}>
      <Skeleton className={styles.img} />

      <Skeleton className={styles.name} />

      <Skeleton className={styles.price} />
    </article>
  );
};
