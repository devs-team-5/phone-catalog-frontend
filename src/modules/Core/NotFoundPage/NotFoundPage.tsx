import { Link } from 'react-router';
import styles from './NotFoundPage.module.scss';

export const PageNotFound = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Page not found</h1>
    <Link
      to="/"
      className={styles.button}
    >
      Back to home
    </Link>
  </div>
);
