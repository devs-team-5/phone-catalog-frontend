import { Link } from 'react-router-dom';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './NotFoundPage.module.scss';

export const PageNotFound = () => (
  <div className={styles.container}>
    <Typography
      variant="h1"
      className={styles.title}
    >
      Page not found
    </Typography>
    <Link
      to="/"
      className={styles.button}
    >
      <Typography
        variant="buttons"
        color={'secondary'}
      >
        Back to home
      </Typography>
    </Link>
  </div>
);
