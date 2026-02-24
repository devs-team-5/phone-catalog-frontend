import React, { useState } from 'react';
import {
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from './PaymentForm.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';

type Props = {
  amount: number;
};

export const PaymentForm: React.FC<Props> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${window.location.pathname}?payment=success#/cart`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred.');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Local redirect using HashRouter format without reloading the page
      window.location.hash = '/cart?payment=success';
    }

    setIsProcessing(false);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <Typography variant="h3">Complete your payment</Typography>

      <div className={styles.form__express}>
        <ExpressCheckoutElement onConfirm={() => {}} />
      </div>

      <PaymentElement />

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className={styles.form__button}
      >
        {isProcessing ? 'Processing... ' : `Pay $${amount}`}
      </button>

      {errorMessage && (
        <div className={styles.form__message}>{errorMessage}</div>
      )}
    </form>
  );
};
