import { Typography } from '@/components/ui/Typography/Typography';
import styles from './ProductActions.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { useFavourites } from '@/context/FavouritesContext';
import type { MainSpecs } from '@/types/MainSpecs';
import type { ButtonColor } from '@/components/ui/Button/constants';

type Props = {
  colorsAvailable: string[];
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
  colorsAvailable,
  capacityAvailable,
  priceDiscount,
  mainSpecs,
  getColorUrl,
  getCapacityUrl,
}) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const isFav = isFavourite(id);

  const normalizedColor = (color: string) => {
    return color.replaceAll(' ', '').toUpperCase();
  };

  return (
    <div className={styles.action}>
      <article className={styles.colors_title}>
        <Typography
          variant="body"
          color="secondary"
        >
          Available colors
        </Typography>
        <Typography
          variant="body"
          color="secondary"
        >
          ID: 802390
        </Typography>
      </article>

      <article className={styles.colors}>
        {colorsAvailable.map((color) => {
          const colorLink = color.replaceAll(' ', '-');
          return (
            <Link
              to={getColorUrl(colorLink)}
              key={color}
            >
              <Button
                shape="circle"
                baseColor={normalizedColor(color) as ButtonColor}
              />
            </Link>
          );
        })}
      </article>
      <hr className={styles.line} />

      <article>
        <Typography
          variant="body"
          color="secondary"
        >
          Select capacity
        </Typography>
        <div className={styles.capacity}>
          {capacityAvailable.map((capacity) => (
            <Link
              className={styles.value}
              key={capacity}
              to={getCapacityUrl(capacity)}
            >
              <Typography
                variant="body"
                color="primary"
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
        <Typography
          variant="h2"
          color="secondary"
          className="text-decoration: line-through"
        >
          {`$${priceRegular}`}
        </Typography>
      </section>

      <section className={styles.buttons}>
        <div className={styles.addToCart}>Add to cart</div>
        <Button
          size="48"
          onClick={() => toggleFavourite(id)}
        >
          {isFav ?
            <ICON_MAP.WISHLIST_RED />
          : <ICON_MAP.WISHLIST />}
        </Button>
      </section>

      {mainSpecs.map(({ label, value }) => (
        <article
          className={styles.mainSpecs}
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
    </div>
  );
};
