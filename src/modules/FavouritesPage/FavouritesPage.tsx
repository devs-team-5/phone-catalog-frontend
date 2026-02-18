import React, { useState } from 'react';
// import { useFavourites } from '@/context/FavouritesContext';
import { ProductCard } from '@/components/common/ProductCard/ProductCard';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './FavouritesPage.module.scss';
import { getProducts } from '@/api/products';
import type { Product } from '@/types/Product';

export const FavouritesPage = () => {
  // const { favourites } = useFavourites();
  const [favourites, setFavourites] = useState<Product[]>([]);
  React.useEffect(() => {
    getProducts().then(setFavourites);
  }, []);

  return (
    <main className={styles.container}>
      <Typography
        variant="h1"
        className={styles.title}
      >
        Favourites
      </Typography>
      <p className={styles.count}>{favourites.length} items</p>

      <div className={styles.grid}>
        {favourites.map((product) => (
          <div
            key={product.id}
            className={styles.grid_item}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};
