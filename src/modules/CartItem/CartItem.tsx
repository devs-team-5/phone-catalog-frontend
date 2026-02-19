import styles from './CartItem.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography/Typography';

export const CartItem = () => {
  return (
    <article className={styles.item}>
      <div className={styles.item__info}>
        <button className={styles.item__remove}>
          <ICON_MAP.CLOSE_GRAY />
        </button>
        <div className={styles.item__img_wrapper}>
          <img
            src="https://content2.rozetka.com.ua/goods/images/big/637949394.jpg"
            alt=""
            className={styles.item__img}
          />
        </div>

        <p className={styles.item__name}>
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </p>
      </div>
      <div className={styles.item__actions}>
        <div className={styles.item__quantity}>
          <Button className={styles.item__btn}>
            <ICON_MAP.MINUS_GRAY />
          </Button>

          <span className={styles.item__count}>2</span>

          <Button className={styles.item__btn}>
            <ICON_MAP.PLUS />
          </Button>
        </div>
        <Typography
          variant="h3"
          className={styles.item__price}
        >
          $999
        </Typography>
      </div>
    </article>
  );
};
