import { Typography } from '@/components/ui/Typography/Typography';
import styles from './CartSummary.module.scss';

export const CartSummary = () => {
  return (
    <div className={styles.summary}>
      <div className={styles.summary__total}>
        <Typography variant="h2">$2657</Typography>
        <p className={styles.summary__text}>Total for 3 items</p>
      </div>

      <div className={styles.summary__divider}></div>

      <button className={styles.summary__checkout}>Checkout</button>
    </div>
  );
};
