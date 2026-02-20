import { useEffect, useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './FavouritesPage.module.scss';
import { getProductById } from '@/api/products';
import type { Product } from '@/types/Product';
import { useFavourites } from '@/hooks/favourites';
import { ProductsList } from '@/components/common/ProductsList/ProductsList';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { STATIC_IMAGES } from '@/constants/images';
import { Link } from 'react-router-dom';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();
  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
  useEffect(() => {
    Promise.all(favourites.map((id) => getProductById(id)))
      .then((products) => {
        setFavouriteProducts(products);
      })
      .catch((error) => {
        console.error('Failed to fetch favourite products', error);
      });
  }, [favourites]);

  return (
    <section>
      <Breadcrumbs />
      <Typography
        variant="h1"
        className={styles.title}
      >
        Favourites
      </Typography>
      {favourites.length > 0 ?
        <>
          <Typography
            variant="body"
            color="secondary"
            className={styles.count}
          >
            {favourites.length} items
          </Typography>
          <ProductsList products={favouriteProducts} />
        </>
      : <>
          <Typography
            variant="h2"
            color="primary"
          >
            Your wishlist is empty
          </Typography>
          <Typography
            variant="body"
            color="secondary"
          >
            Add your first product to the wishlist
          </Typography>
          <Link to="/">
            <img
              src={STATIC_IMAGES.placeholders.emptyCart}
              alt="Empty wishlist"
              className={styles.emptyImage}
            />
          </Link>
        </>
      }
    </section>
  );
};
