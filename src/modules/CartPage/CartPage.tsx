import { Typography } from '@/components/ui/Typography/Typography';
import styles from './CartPage.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { CartItem } from './components/CartItem/CartItem';
import { CartSummary } from './components/CartSummary/CartSummary';
import { useCart } from '@/hooks/cart';
import { useEffect, useState } from 'react';
import { getProductById } from '@/api/products';
import type { ProductWithCount } from '@/types/ProductWithCount';
import type { Product } from '@/types/Product';

export const CartPage = () => {
  const { cart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const currentIds = cart.map((item) => item.itemId);
    const loadedIds = products.map((product) => product.itemId);
    const missingIds = currentIds.filter((id) => !loadedIds.includes(id));

    if (missingIds.length > 0) {
      Promise.all(missingIds.map((id) => getProductById(id)))
        .then((newProducts) => {
          setProducts((prev) => [...prev, ...newProducts]);
        })
        .catch((error) => {
          console.error('Failed to fetch cart products', error);
        });
    }
  }, [cart, products]);

  const cartProducts: ProductWithCount[] = cart
    .map((item) => {
      const product = products.find((p) => p.itemId === item.itemId);
      if (!product) return null;
      return {
        ...product,
        count: item.count,
      };
    })
    .filter((p): p is ProductWithCount => p !== null);

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
            {cartProducts.map((product) => (
              <CartItem
                product={product}
                key={product.itemId}
              />
            ))}
          </div>
          <CartSummary products={cartProducts} />
        </div>
      </main>
    </div>
  );
};
