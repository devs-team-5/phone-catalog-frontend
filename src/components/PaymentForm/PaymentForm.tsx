import { useState } from 'react';
import {
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from './PaymentForm.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';
import { supabase } from '@/utils/supabaseClient';
import { useAuth } from '@/hooks/auth';
import type { DeliveryDetails } from '../CheckoutModal/CheckoutModal';
import type { ProductWithCount } from '@/types/ProductWithCount';

type Props = {
  amount: number;
  products: ProductWithCount[];
  delivery: DeliveryDetails;
};

export const PaymentForm = ({ amount, products, delivery }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      if (user) {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            status: 'pending',
            total_amount: amount,
            currency: 'USD',
            delivery_city: delivery.city,
            delivery_branch: delivery.branch,
          })
          .select()
          .single();

        if (orderError) throw orderError;

        if (orderData) {
          const orderItemsToInsert = products.map((p) => ({
            order_id: orderData.id,
            item_id: p.itemId,
            count: p.count,
            price: p.price,
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItemsToInsert);

          if (itemsError) throw itemsError;
        }
      }

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
        window.location.hash = '/cart?payment=success';
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(
          err.message || 'An error occurred while creating order',
        );
      } else {
        setErrorMessage('An error occurred while creating order');
      }
    } finally {
      setIsProcessing(false);
    }
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
