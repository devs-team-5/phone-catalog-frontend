import styles from './Welcome.module.scss';
import { Slider } from './components/Slider';

export const Welcome = () => {
  return (
    <section className={styles.welcome}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <Slider />
    </section>
  );
};
