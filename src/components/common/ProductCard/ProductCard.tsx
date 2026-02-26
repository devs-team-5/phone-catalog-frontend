import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/Product';
import React, { useState, useRef } from 'react';
import { getImageUrl } from '@/api/products';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Button } from '@/components/ui/Button';
import { useFavourites } from '@/hooks/favourites';
import { Typography } from '@/components/ui/Typography/Typography';
import { useCart } from '@/hooks/cart';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@/store/toast';

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

  const { t } = useTranslation<'translation'>();
  const spesc = [
    { label: 'specs.screen', value: screen },
    { label: 'specs.capacity', value: capacity },
    { label: 'specs.ram', value: ram },
  ];

  const imageUrl = getImageUrl(image);
  const isProductOld = fullPrice > price;
  const { isFavourite, toggleFavourite } = useFavourites();
  const { toggleCart, isInCart } = useCart();
  const { showToast } = useToastStore();
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const isFav = isFavourite(itemId);
  const isCart = isInCart(itemId);

  const handleCartClick = () => {
    if (!isCart) {
      flyToCart();
    }

    toggleCart(itemId);

    if (isCart) {
      showToast({
        type: 'error',
        title: t('toast.cart.removedTitle'),
        message: t('toast.cart.removedMessage', { name }),
      });
    } else {
      showToast({
        type: 'success',
        title: t('toast.cart.addedTitle'),
        message: t('toast.cart.addedMessage', { name }),
      });
    }
  };

  const handleFavouriteClick = () => {
    const wasFav = isFav;

    toggleFavourite(itemId);

    setIsHeartAnimating(true);
    setShowFloatingHeart(true);

    setTimeout(() => setIsHeartAnimating(false), 400);
    setTimeout(() => setShowFloatingHeart(false), 800);

    if (wasFav) {
      showToast({
        type: 'error',
        title: t('toast.favourites.removedTitle'),
        message: t('toast.favourites.removedMessage', { name }),
        icon: 'heart',
      });
    } else {
      showToast({
        type: 'success',
        title: t('toast.favourites.addedTitle'),
        message: t('toast.favourites.addedMessage', { name }),
        icon: 'heart',
      });
    }
  };

  const flyToCart = () => {
    if (window.innerWidth <= 768) return;

    const image = imageRef.current;
    if (!image) return;

    const cart = document.querySelector<HTMLElement>('[data-cart-icon]');
    if (!cart) return;

    const imageRect = image.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9999';

    document.documentElement.appendChild(overlay);

    const flyingImage = image.cloneNode(true) as HTMLImageElement;

    flyingImage.style.position = 'absolute';
    flyingImage.style.left = `${imageRect.left}px`;
    flyingImage.style.top = `${imageRect.top}px`;
    flyingImage.style.width = `${imageRect.width}px`;
    flyingImage.style.height = `${imageRect.height}px`;
    flyingImage.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    flyingImage.style.willChange = 'transform';

    overlay.appendChild(flyingImage);

    // Летимо НЕ в центр, а трохи перед корзиною
    const deltaX = cartRect.left - imageRect.left - imageRect.width * 0.3;

    const deltaY = cartRect.top - imageRect.top - imageRect.height * 0.3;

    requestAnimationFrame(() => {
      flyingImage.style.transform = `
      translate(${deltaX}px, ${deltaY}px)
      scale(0.3)
    `;
      flyingImage.style.opacity = '0';
    });

    setTimeout(() => {
      overlay.remove();
      cart.classList.add('cartBounce');
      setTimeout(() => cart.classList.remove('cartBounce'), 400);
    }, 600);
  };

  return (
    <div className={styles.product}>
      <Link to={`/${category}/${itemId}`}>
        <img
          ref={imageRef}
          src={imageUrl}
          className={styles.image}
          alt={name}
          loading="lazy"
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
          onClick={handleCartClick}
        >
          {isCart ? t('product.added') : t('product.addToCart')}
        </button>

        <div className={styles.heartWrapper}>
          <Button
            className={cn(styles.favorite, {
              [styles.heartActive]: isHeartAnimating,
            })}
            size="40"
            onClick={handleFavouriteClick}
          >
            {isFav ?
              <ICON_MAP.WISHLIST_RED />
            : <ICON_MAP.WISHLIST />}
          </Button>

          {showFloatingHeart && (
            <span
              className={cn(styles.floatingHeart, {
                [styles.broken]: isFav,
              })}
            >
              {isFav ? '❤️' : '💔'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
