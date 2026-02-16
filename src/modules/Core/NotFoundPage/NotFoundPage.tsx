import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';

export const PageNotFound = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Page not found</h1>
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
