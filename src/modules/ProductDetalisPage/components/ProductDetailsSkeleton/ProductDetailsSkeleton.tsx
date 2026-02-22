import React from 'react';
import styles from './ProductDetailsSkeleton.module.scss';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { BackButton } from '@/components/common/BackButton/BackButton';

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <>
      <Breadcrumbs />
      <div className={styles.container}>
        <BackButton />

        <Skeleton className={styles.mainTitle} />

        <div className={styles.slider_container}>
          <div className={styles.thumbs_container}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className={styles.thumb_item}
              />
            ))}
          </div>
          <Skeleton className={styles.main_container} />
        </div>

        <div className={styles.action}>
          <div className={styles.colors_title}>
            <Skeleton className={styles.title_block} />
            <Skeleton className={styles.title_id} />
          </div>
          <div className={styles.colors}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className={styles.color_item}
              />
            ))}
          </div>

          <div className={styles.capacity_title}>
            <Skeleton className={styles.title_block} />
          </div>
          <div className={styles.capacity}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className={styles.capacity_item}
              />
            ))}
          </div>

          <div className={styles.price}>
            <Skeleton className={styles.price_regular} />
            <Skeleton className={styles.price_discount} />
          </div>

          <div className={styles.buttons}>
            <Skeleton className={styles.button_cart} />
            <Skeleton className={styles.button_fav} />
          </div>

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={styles.specs}
            >
              <Skeleton className={styles.spec_label} />
              <Skeleton className={styles.spec_value} />
            </div>
          ))}
        </div>

        <div className={styles.about}>
          <Skeleton className={styles.description_title} />
          <Skeleton className={styles.description_line} />
          <Skeleton className={styles.description_line} />
          <Skeleton className={styles.description_line_short} />

          <Skeleton className={styles.description_title} />
          <Skeleton className={styles.description_line} />
          <Skeleton className={styles.description_line} />
          <Skeleton className={styles.description_line_short} />
        </div>

        <div className={styles.full_specs}>
          <Skeleton className={styles.description_title} />
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={styles.specs}
            >
              <Skeleton className={styles.spec_label} />
              <Skeleton className={styles.spec_value} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
