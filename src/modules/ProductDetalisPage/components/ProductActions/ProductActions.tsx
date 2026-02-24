import { Typography } from '@/components/ui/Typography/Typography';
import styles from './ProductActions.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import type { MainSpecs } from '@/types/MainSpecs';
import type { ButtonColor } from '@/components/ui/Button/constants';
import { useFavourites } from '@/hooks/favourites';
import { useCart } from '@/hooks/cart';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  currentColor: string;
  colorsAvailable: string[];
  currentCapacity: string;
  capacityAvailable: string[];
  priceDiscount: number;
  priceRegular: number;
  mainSpecs: MainSpecs[];
  id: string;
  getColorUrl: (newColor: string) => string;
  getCapacityUrl: (newCapacity: string) => string;
};

export const ProductActions: React.FC<Props> = ({
  id,
  priceRegular,
  currentColor,
  colorsAvailable,
  currentCapacity,
  capacityAvailable,
  priceDiscount,
  mainSpecs,
  getColorUrl,
  getCapacityUrl,
}) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isInCart, toggleCart } = useCart();
  const isFav = isFavourite(id);
  const isCart = isInCart(id);
  const discount = priceRegular - priceDiscount;
  const { t } = useTranslation<'translation'>();

  const normalizedColor = (color: string) => {
    const correctColorName = color.replaceAll('-', '').toUpperCase();

    return correctColorName.replaceAll(' ', '');
  };

  return (
    <div className={styles.action}>
      <article className={styles.colors_title}>
        <Typography
          variant="body"
          color="secondary"
        >
          product.availableColors
        </Typography>
        <Typography
          variant="body"
          color="secondary"
        >
          ID: 802390
        </Typography>
      </article>

      <article className={styles.colors}>
        {colorsAvailable.map((color) => (
          <Link
            to={getColorUrl(color)}
            key={color}
          >
            <Button
              shape="circle"
              variant={color === currentColor ? 'selected' : undefined}
              baseColor={normalizedColor(color) as ButtonColor}
            />
          </Link>
        ))}
      </article>
      <hr className={styles.line} />

      <article>
        <Typography
          variant="body"
          color="secondary"
        >
          product.selectCapacity
        </Typography>
        <div className={styles.capacity}>
          {capacityAvailable.map((capacity) => (
            <Link
              className={`${styles.value} ${currentCapacity === capacity ? styles.activeCapacity : ''}`}
              key={capacity}
              to={getCapacityUrl(capacity)}
            >
              <Typography
                variant="body"
                color={`${currentCapacity === capacity ? 'white' : 'primary'}`}
              >
                {capacity}
              </Typography>
            </Link>
          ))}
        </div>
      </article>
      <hr className={styles.line} />

      <section className={styles.price}>
        <Typography
          variant="h2"
          color="primary"
        >
          {`$${priceDiscount}`}
        </Typography>
        {discount !== 0 && (
          <div>
            <Typography
              variant="line-through"
              color="secondary"
            >
              {`$${priceRegular}`}
            </Typography>
          </div>
        )}
      </section>

      <section className={styles.buttons}>
        <button
          className={cn(styles.button, {
            [styles.active]: isCart,
          })}
          onClick={() => toggleCart(id)}
        >
          {isCart ? t('product.added') : t('product.addToCart')}
        </button>
        <Button
          size="48"
          onClick={() => toggleFavourite(id)}
        >
          {isFav ?
            <ICON_MAP.WISHLIST_RED />
          : <ICON_MAP.WISHLIST />}
        </Button>
      </section>

      <section className={styles.mainSpecs}>
        {mainSpecs.map(({ label, value }) => (
          <article
            className={styles.specs}
            key={label}
          >
            <Typography
              variant="body"
              color="secondary"
            >
              {label}
            </Typography>
            <Typography variant="body">{value}</Typography>
          </article>
        ))}
      </section>
    </div>
  );
};
