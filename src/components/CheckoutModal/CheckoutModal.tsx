import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from '@/components/PaymentForm/PaymentForm';
import type { ProductWithCount } from '@/types/ProductWithCount';
import styles from './CheckoutModal.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';

import { useThemeStore } from '@/hooks/ThemeStore';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
);

type Props = {
  products: ProductWithCount[];
  onClose: () => void;
};

export const CheckoutModal: React.FC<Props> = ({ products, onClose }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isDark = useThemeStore((state) => state.isDark);

  const totalAmount = products.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Use anonymous key to invoke the function. Or create a custom auth policy.
              // We'll pass it if the edge function checks for it, but for our simple implementation it might not be strictly required.
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            },
            body: JSON.stringify({
              items: products.map((p) => ({
                id: p.itemId,
                quantity: p.count,
              })),
            }),
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to initialize payment');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err: unknown) {
        console.error(err);
        const errorMessage =
          err instanceof Error ? err.message : 'Payment initialization failed.';
        setError(errorMessage);
      }
    };

    fetchPaymentIntent();
  }, [products]);

  const appearance = {
    theme: isDark ? ('night' as const) : ('stripe' as const),
    variables: {
      colorPrimary: isDark ? '#f4ba47' : '#313237', // Accent color
      colorBackground: isDark ? '#313237' : '#ffffff', // Background
      colorText: isDark ? '#f1f2f38c' : '#313237', // Text (Primary)
      colorDanger: '#eb5757', // Red color
    },
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          ✕
        </button>
        {error ?
          <div className={styles.errorContainer}>
            <Typography
              variant="body"
              color="primary"
            >
              {error}
            </Typography>
          </div>
        : !clientSecret ?
          <div className={styles.loadingContainer}>
            <Typography
              variant="body"
              color="primary"
            >
              Loading payment options...
            </Typography>
          </div>
        : <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance }}
          >
            <PaymentForm amount={totalAmount} />
          </Elements>
        }
      </div>
    </div>
  );
};
