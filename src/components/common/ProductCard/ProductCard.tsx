import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/Product';
import type React from 'react';
import { getImageUrl } from '@/api/products';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Button } from '@/components/ui/Button';
import { useFavourites } from '@/hooks/favourites';
import { Typography } from '@/components/ui/Typography/Typography';
import { useCart } from '@/hooks/cart';
import { cn } from '@/lib/utils';
type Props = {
  product: Product;
};
export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    category,
    itemId,
    name,
    image,
    price,
    fullPrice,
    ram,
    capacity,
    screen,
  } = product;

  const spesc = [
    { label: 'Screen', value: screen },
    { label: 'Capacity', value: capacity },
    { label: 'RAM', value: ram },
  ];

  const imageUrl = getImageUrl(image);
  const isProductOld = fullPrice > price;
  const { isFavourite, toggleFavourite } = useFavourites();
  const { toggleCart, isInCart } = useCart();

  const isFav = isFavourite(itemId);
  const isCart = isInCart(itemId);

  return (
    <div className={styles.product}>
      <Link to={`/${category}/${itemId}`}>
        <img
          src={imageUrl}
          className={styles.image}
          alt={name}
        />
      </Link>

      <Link
        to={`/${category}/${itemId}`}
        className={styles.title}
        title={name}
      >
        <Typography
          variant="body"
          color="primary"
        >
          {name}
        </Typography>
      </Link>

      <div className={styles.price}>
        <Typography variant="h3">{`$${price}`}</Typography>
        {isProductOld && (
          <Typography variant="line-through">{`$${fullPrice}`}</Typography>
        )}
      </div>

      <hr className={styles.separateLine} />

      <div className={styles.details}>
        {spesc.map(({ label, value }) => (
          <div
            className={styles.details__container}
            key={label}
            title={value}
          >
            <Typography
              variant="small"
              color="secondary"
              className={styles.label}
            >
              {label}
            </Typography>
            <Typography
              variant="uppercase"
              className={styles.value}
            >
              {value}
            </Typography>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <button
          className={cn(styles.button, {
            [styles.active]: isCart,
          })}
          onClick={() => toggleCart(itemId)}
        >
          {isCart ? 'Added' : 'Add to cart'}
        </button>

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
