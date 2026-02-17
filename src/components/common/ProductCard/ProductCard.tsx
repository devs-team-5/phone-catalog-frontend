import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';

export const ProductCard = () => (
  <div className={styles.product}>
    <img
      src="src/components/ui/ProductCard/product-img.png"
      className={styles.image}
      alt="product-img"
    ></img>
    <Link
      to={'/'}
      className={styles.title}
    >
      Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
    </Link>

    <div className={styles.price}>
      <span className={styles.price_current}>$799</span>
      <span className={styles.price_discount}>$899</span>
    </div>

    <hr className={styles.separateLine} />

    <div className={styles.details}>
      <div className={styles.details__container}>
        <span className={styles.info}>Screen</span>
        <span className={styles.value}>5.8” OLED</span>
      </div>

      <div className={styles.details__container}>
        <span className={styles.info}>Capacity</span>
        <span className={styles.value}>64 GB</span>
      </div>

      <div className={styles.details__container}>
        <span className={styles.info}>RAM</span>
        <span className={styles.value}>4 GB</span>
      </div>
    </div>

    <div className={styles.buttons}>
      <button
        className={styles.button}
        onClick={() => {}}
      >
        Add to cart
      </button>
      <button className={styles.favorite}></button>
    </div>
  </div>
);
