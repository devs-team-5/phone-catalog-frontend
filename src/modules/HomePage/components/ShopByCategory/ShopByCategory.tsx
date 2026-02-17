import { Typography } from '@/components/ui/Typography/Typography';
import styles from './ShopByCategory.module.scss';
import { CategoryCard } from '../CategoryCard';
import { STATIC_IMAGES } from '@/constants/images';

export const ShopByCategory = () => {
  return (
    <section>
      <Typography variant="h2">Shop by category</Typography>

      <div className={styles.categories}>
        <CategoryCard
          to="/phones"
          video={STATIC_IMAGES.videos.phones}
          image={STATIC_IMAGES.categories.phones}
          title="Mobile phones"
          count={120}
        />
        <CategoryCard
          to="/tablets"
          video={STATIC_IMAGES.videos.tablets}
          image={STATIC_IMAGES.categories.tablets}
          title="Tablets"
          count={120}
        />
        <CategoryCard
          to="/accessories"
          video={STATIC_IMAGES.videos.accessories}
          image={STATIC_IMAGES.categories.accessories}
          title="Accessories"
          count={120}
        />
      </div>
    </section>
  );
};
