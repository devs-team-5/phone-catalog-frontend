import { Typography } from '@/components/ui/Typography/Typography';
import styles from './CartSummary.module.scss';
import type { ProductWithCount } from '@/types/ProductWithCount';
import { useTranslation } from 'react-i18next';

type Props = {
  products: ProductWithCount[];
};

export const CartSummary: React.FC<Props> = ({ products }) => {
  const totalCount = products.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = products.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );
  const { t } = useTranslation<'translation'>();

  return (
    <div className={styles.summary}>
      <div className={styles.summary__total}>
        <Typography variant="h2">${totalPrice}</Typography>
        <Typography
          variant="body"
          color="secondary"
          className={styles.summary__text}
        >
          {t('cart.total')} {totalCount} {t('cart.item', { count: totalCount })}
        </Typography>
      </div>

      <div className={styles.summary__divider}></div>

      <button className={styles.summary__checkout}>{t('cart.checkout')}</button>
    </div>
  );
};
