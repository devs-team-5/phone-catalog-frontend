import { supabase } from '@/utils/supabaseClient';
import type { Order } from '@/types/Order';

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      id,
      status,
      total_amount,
      currency,
      delivery_city,
      delivery_branch,
      created_at,
      order_items (
        id,
        item_id,
        count,
        price
      )
    `,
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data as unknown as Order[];
};
