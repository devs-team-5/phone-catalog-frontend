import { getImageUrl } from '@/api/products';
import styles from './SearchItem.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';
import type { Product } from '@/types/Product';
import type React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export const SearchItem: React.FC<Props> = ({ product }) => {
  const { name, price, image, category } = product;

  console.log(product);

  return (
    <article className={styles.item}>
      <div className={styles.item__img_wrapper}>
        <Link to={`/${category}/${name}`}>
          <img
            src={getImageUrl(image)}
            className={styles.item__img}
            loading="lazy"
            alt={name}
          />
        </Link>

        <Link to={`/${category}/${name}`}>
          <Typography
            variant="body"
            className={styles.item__name}
          >
            {name}
          </Typography>
        </Link>
      </div>

      <Typography
        variant="h3"
        className={styles.item__price}
      >
        {`$${price}`}
      </Typography>
    </article>
  );
};
