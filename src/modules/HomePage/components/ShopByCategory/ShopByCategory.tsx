import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <section className={styles.shop}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories}>
        <div className={styles.card}>
          <div className={styles.image} />
          <h3 className={styles.cardTitle}>Mobile phones</h3>
          <p className={styles.count}>95 models</p>
        </div>

        <div className={styles.card}>
          <div className={styles.image} />
          <h3 className={styles.cardTitle}>Tablets</h3>
          <p className={styles.count}>24 models</p>
        </div>

        <div className={styles.card}>
          <div className={styles.image} />
          <h3 className={styles.cardTitle}>Accessories</h3>
          <p className={styles.count}>100 models</p>
        </div>
      </div>
    </section>
  );
};
