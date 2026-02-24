import { Typography } from '@/components/ui/Typography/Typography';
import styles from './Welcome.module.scss';
import { Slider } from './components/Slider';

export const Welcome = () => {
  return (
    <section className={styles.welcome}>
      <Typography
        variant="h1"
        className={styles.title}
      >
        welcome.title
      </Typography>

      <Slider />
    </section>
  );
};
