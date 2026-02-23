import { useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './CartSummary.module.scss';
import type { ProductWithCount } from '@/types/ProductWithCount';
import { CheckoutModal } from '@/components/CheckoutModal/CheckoutModal';

type Props = {
  products: ProductWithCount[];
};

export const CartSummary: React.FC<Props> = ({ products }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalCount = products.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = products.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  return (
    <>
      <div className={styles.summary}>
        <div className={styles.summary__total}>
          <Typography variant="h2">${totalPrice}</Typography>
          <Typography
            variant="body"
            color="secondary"
            className={styles.summary__text}
          >
            Total for {totalCount} item{totalCount !== 1 ? 's' : ''}
          </Typography>
        </div>

        <div className={styles.summary__divider}></div>

        <button
          className={styles.summary__checkout}
          onClick={() => setIsCheckoutOpen(true)}
        >
          Checkout
        </button>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal
          products={products}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </>
  );
};
