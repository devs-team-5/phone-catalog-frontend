import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'npm:stripe@^14.0.0';

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16', // Use the latest stable version or match your account
  httpClient: Stripe.createFetchHttpClient(),
});

// Configure CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('No items provided');
    }

    // Initialize Supabase Client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Extract item IDs to fetch prices
    const itemIds = items.map(
      (item: { id: string; quantity: number }) => item.id,
    );

    // Fetch products from the database to securely get their prices
    const { data: products, error } = await supabaseClient
      .from('products')
      .select('itemId, price')
      .in('itemId', itemIds);

    if (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch product details.');
    }

    if (!products || products.length === 0) {
      throw new Error('Products not found.');
    }

    // Calculate total amount securely on the backend
    let totalAmount = 0;
    for (const item of items) {
      const product = products.find((p) => p.itemId === item.id);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    // Stripe expects amounts in the smallest currency unit (e.g., cents for USD, kopecks for UAH)
    // Assuming the DB price is in USD and we need to multiply by 100
    const finalAmountInCoins = Math.round(totalAmount * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmountInCoins,
      currency: 'usd',
      // Optionally, you can add metadata here like order IDs or user IDs
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret, which the frontend needs to complete the payment
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Payment intent error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
