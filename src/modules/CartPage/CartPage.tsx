import { Typography } from '@/components/ui/Typography/Typography';
import styles from './CartPage.module.scss';
import { CartItem } from './components/CartItem/CartItem';
import { CartItemSkeleton } from './components/CartItem/CartItemSkeleton';
import { CartSummary } from './components/CartSummary/CartSummary';
import { CartSummarySkeleton } from './components/CartSummary/CartSummarySkeleton';
import { useCart } from '@/hooks/cart';
import { useEffect, useState } from 'react';
import { getProductById } from '@/api/products';
import type { ProductWithCount } from '@/types/ProductWithCount';
import type { Product } from '@/types/Product';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { Link } from 'react-router-dom';
import { STATIC_IMAGES } from '@/constants/images';

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
        <BackButton />
        <Typography variant="h1">Cart</Typography>
        {cart.length > 0 ?
          <div className={styles.cart__content}>
            <div className={styles.cart__list}>
              {cart.map((item) => {
                const product = cartProducts.find(
                  (p) => p.itemId === item.itemId,
                );
                return product ?
                    <CartItem
                      product={product}
                      key={product.itemId}
                    />
                  : <CartItemSkeleton key={item.itemId} />;
              })}
            </div>
            {cart.length === cartProducts.length ?
              <CartSummary products={cartProducts} />
            : <CartSummarySkeleton />}
          </div>
        : <>
            <Typography
              variant="h2"
              color="primary"
            >
              Your cart is empty
            </Typography>
            <Typography
              variant="body"
              color="secondary"
            >
              Add your first product to the cart
            </Typography>
            <Link to="/">
              <img
                src={STATIC_IMAGES.placeholders.emptyCart}
                alt="Empty cart"
                className={styles.emptyImage}
                loading="lazy"
              />
            </Link>
          </>
        }
      </main>
    </div>
  );
};
