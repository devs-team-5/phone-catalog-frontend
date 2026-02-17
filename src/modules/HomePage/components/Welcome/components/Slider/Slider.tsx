import styles from './Slider.module.scss';

export const Slider = () => {
  return (
    <div className={styles.slider}>
      <button className={styles.arrow}>‹</button>

      <div className={styles.viewport}>
        <div className={styles.slide}>Banner</div>
      </div>

      <button className={styles.arrow}>›</button>
    </div>
  );
};
