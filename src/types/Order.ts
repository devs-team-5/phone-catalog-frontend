export interface OrderItem {
  id: string;
  item_id: string;
  count: number;
  price: number;
}

export interface Order {
  id: string;
  status: string;
  total_amount: number;
  currency: string;
  created_at: string;
  order_items: OrderItem[];
}
