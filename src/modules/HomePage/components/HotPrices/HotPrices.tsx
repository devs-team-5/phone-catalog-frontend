import styles from './HotPrices.module.scss';

export const HotPrices = () => {
  return (
    <section className={styles.hot}>
      <div className={styles.header}>
        <h2 className={styles.title}>Hot prices</h2>
      </div>

      <div className={styles.products}>
        Product card Product card Product card Product card
      </div>
    </section>
  );
};
