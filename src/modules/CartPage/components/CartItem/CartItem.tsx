import styles from './CartItem.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography/Typography';
import type { ProductWithCount } from '@/types/ProductWithCount';
import { getImageUrl } from '@/api/products';
import { useCart } from '@/hooks/cart';
import { Link } from 'react-router-dom';

export const CartItem = ({ product }: { product: ProductWithCount }) => {
  const { toggleCart, increaseCount, decreaseCount } = useCart();

  return (
    <article className={styles.item}>
      <div className={styles.item__info}>
        <Button
          className={styles.item__remove}
          onClick={() => toggleCart(product.itemId)}
        >
          <ICON_MAP.CLOSE_GRAY />
        </Button>
        <div className={styles.item__img_wrapper}>
          <Link to={`/${product.category}/${product.itemId}`}>
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className={styles.item__img}
            />
          </Link>
        </div>

        <Link to={`/${product.category}/${product.itemId}`}>
          <Typography
            variant="body"
            className={styles.item__name}
          >
            {product.name}
          </Typography>
        </Link>
      </div>
      <div className={styles.item__actions}>
        <div className={styles.item__quantity}>
          <Button
            className={styles.item__btn}
            onClick={() => decreaseCount(product.itemId)}
            disabled={product.count === 1}
          >
            {product.count === 1 ?
              <ICON_MAP.MINUS_GRAY />
            : <ICON_MAP.MINUS />}
          </Button>

          <Typography
            variant="body"
            className={styles.item__count}
          >
            {product.count}
          </Typography>

          <Button
            className={styles.item__btn}
            onClick={() => increaseCount(product.itemId)}
          >
            <ICON_MAP.PLUS />
          </Button>
        </div>
        <Typography
          variant="h3"
          className={styles.item__price}
        >
          ${product.price * product.count}
        </Typography>
      </div>
    </article>
  );
};
