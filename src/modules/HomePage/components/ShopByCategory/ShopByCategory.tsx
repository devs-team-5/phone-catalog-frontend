import { Typography } from '@/components/ui/Typography/Typography';
import styles from './ShopByCategory.module.scss';
import { CategoryCard } from '../CategoryCard';
import { STATIC_IMAGES } from '@/constants/images';
import { useEffect, useState } from 'react';
import { getProductsCountByCategory } from '@/api/products';

export const ShopByCategory = () => {
  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [phonesCount, tabletsCount, accessoriesCount] = await Promise.all(
          [
            getProductsCountByCategory('phones'),
            getProductsCountByCategory('tablets'),
            getProductsCountByCategory('accessories'),
          ],
        );

        setCounts({
          phones: phonesCount,
          tablets: tabletsCount,
          accessories: accessoriesCount,
        });
      } catch (error) {
        console.error('Failed to fetch category counts', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section>
      <Typography variant="h2">products.category</Typography>

      <div className={styles.categories}>
        <CategoryCard
          to="/phones"
          video={STATIC_IMAGES.videos.phones}
          image={STATIC_IMAGES.categories.phones}
          title="nav.phones"
          count={counts.phones}
        />
        <CategoryCard
          to="/tablets"
          video={STATIC_IMAGES.videos.tablets}
          image={STATIC_IMAGES.categories.tablets}
          title="nav.tablets"
          count={counts.tablets}
        />
        <CategoryCard
          to="/accessories"
          video={STATIC_IMAGES.videos.accessories}
          image={STATIC_IMAGES.categories.accessories}
          title="nav.accessories"
          count={counts.accessories}
        />
      </div>
    </section>
  );
};
