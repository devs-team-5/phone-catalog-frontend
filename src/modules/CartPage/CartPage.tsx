import { Typography } from '@/components/ui/Typography/Typography';
import styles from './CartPage.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { CartItem } from '../CartItem/CartItem';
import { CartSummary } from '../CartItem/CartSummary/CartSummary';

export const CartPage = () => {
  return (
    <div className={styles.cart}>
      <main className={styles.cart__container}>
        <div className={styles.cart__back}>
          <div className={styles.cart__back_btn}>
            <ICON_MAP.CHEVRON_LEFT />
          </div>

          <Typography
            variant="small"
            color="secondary"
            className={styles.cart__back_title}
          >
            Back
          </Typography>
        </div>
        <Typography
          variant="h1"
          className={styles.cart__title}
        >
          Cart
        </Typography>
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <CartSummary />
        </div>
      </main>
    </div>
  );
};
