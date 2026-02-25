import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from '@/components/PaymentForm/PaymentForm';
import type { ProductWithCount } from '@/types/ProductWithCount';
import styles from './CheckoutModal.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';

import { useThemeStore } from '@/hooks/ThemeStore';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
);

export type DeliveryDetails = {
  city: string;
  branch: string;
};

type Props = {
  products: ProductWithCount[];
  onClose: () => void;
};

export const CheckoutModal: React.FC<Props> = ({ products, onClose }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<DeliveryDetails>({
    city: '',
    branch: '',
  });
  const [isReadyToPay, setIsReadyToPay] = useState(false);
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
      colorPrimary: isDark ? '#f1f2f38c' : '#313237',
      colorBackground: isDark ? '#313237' : '#ffffff',
      colorText: isDark ? '#f1f2f38c' : '#313237',
      colorDanger: '#eb5757',
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
        : !isReadyToPay ?
          <div className={styles.deliveryForm}>
            <Typography
              variant="h3"
              className={styles.formTitle}
            >
              Delivery Details
            </Typography>
            <div className={styles.field}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={delivery.city}
                onChange={(e) =>
                  setDelivery((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="Kyiv"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="branch">Nova Post Branch</label>
              <input
                id="branch"
                type="text"
                value={delivery.branch}
                onChange={(e) =>
                  setDelivery((prev) => ({ ...prev, branch: e.target.value }))
                }
                placeholder="Branch #1"
              />
            </div>
            <button
              className={styles.proceedBtn}
              onClick={() => setIsReadyToPay(true)}
              disabled={!delivery.city || !delivery.branch}
            >
              Proceed to Payment
            </button>
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
            <PaymentForm
              amount={totalAmount}
              products={products}
              delivery={delivery}
            />
          </Elements>
        }
      </div>
    </div>
  );
};
