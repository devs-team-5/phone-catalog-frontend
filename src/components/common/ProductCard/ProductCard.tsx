import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/Product';
import type React from 'react';
import { getImageUrl } from '@/api/products';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Button } from '@/components/ui/Button';
import { useFavourites } from '@/context/FavouritesContext';
type Props = {
  product: Product;
};
export const ProductCard: React.FC<Props> = ({ product }) => {
  const { category, itemId, name, image, price, fullPrice, ram, capacity, screen, year } =
    product;

  const imageUrl = getImageUrl(image);
  const isProductOld = year < 2022;
  const { isFavourite, toggleFavourite } = useFavourites();

  const isFav = isFavourite(itemId);

  return (
    <div className={styles.product}>
      <img
        src={imageUrl}
        className={styles.image}
        alt={name}
      ></img>
      <Link
        to={`/${category}/${itemId}`}
        className={styles.title}
      >
        {name}
      </Link>

      <div className={styles.price}>
        <span className={styles.price_current}>{`$${price}`}</span>
        {isProductOld ?
          <span className={styles.price_discount}>{fullPrice}</span>
        : null}
      </div>

      <hr className={styles.separateLine} />

      <div className={styles.details}>
        <div className={styles.details__container}>
          <span className={styles.info}>Screen</span>
          <span className={styles.value}>{screen}</span>
        </div>

        <div className={styles.details__container}>
          <span className={styles.info}>Capacity</span>
          <span className={styles.value}>{capacity}</span>
        </div>

        <div className={styles.details__container}>
          <span className={styles.info}>RAM</span>
          <span className={styles.value}>{ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => {}}
        >
          Add to cart
        </button>
        <button></button>
        <Button
          className={styles.favorite}
          size="40"
          onClick={() => toggleFavourite(itemId)}
        >
          {isFav ?
            <ICON_MAP.WISHLIST_RED />
          : <ICON_MAP.WISHLIST />}
        </Button>
      </div>
    </div>
  );
};
