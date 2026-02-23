import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SuccessView.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';

export const SuccessView: React.FC = () => {
  return (
    <div className={styles.success}>
      <div className={styles.success__icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <Typography variant="h2">Thank you for your order!</Typography>

      <Typography
        variant="body"
        color="secondary"
        className={styles.success__text}
      >
        Your payment was successful and your order is now being processed.
      </Typography>

      <Link
        to="/"
        className={styles.success__button}
      >
        Continue Shopping
      </Link>
    </div>
  );
};
