import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/utils/supabaseClient';
import { useAuth } from './auth';

type CartItem = {
  itemId: string;
  count: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  toggleCart: (id: string) => void;
  getCartCount: () => number;
  increaseCount: (id: string) => void;
  decreaseCount: (id: string) => void;
  clearCart: () => void;
  syncWithServer: (items: CartItem[]) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      syncWithServer: (items) => set({ cart: items }),
      addToCart: async (id: string) => {
        set((state) => ({ cart: [...state.cart, { itemId: id, count: 1 }] }));
        const user = useAuth.getState().user;
        if (user) {
          await supabase.from('cart_items').insert({
            user_id: user.id,
            item_id: id,
            count: 1,
          });
        }
      },
      removeFromCart: async (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.itemId !== id),
        }));
        const user = useAuth.getState().user;
        if (user) {
          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id)
            .eq('item_id', id);
        }
      },
      isInCart: (id: string) => {
        return get().cart.some((item) => item.itemId === id);
      },
      toggleCart: (id: string) => {
        const { isInCart, addToCart, removeFromCart } = get();
        if (isInCart(id)) {
          removeFromCart(id);
        } else {
          addToCart(id);
        }
      },
      getCartCount: () => {
        return get().cart.length;
      },
      increaseCount: async (id: string) => {
        const cartItem = get().cart.find((i) => i.itemId === id);
        if (!cartItem) return;

        set((state) => ({
          cart: state.cart.map((item) =>
            item.itemId === id ? { ...item, count: item.count + 1 } : item,
          ),
        }));

        const user = useAuth.getState().user;
        if (user) {
          await supabase
            .from('cart_items')
            .update({ count: cartItem.count + 1 })
            .eq('user_id', user.id)
            .eq('item_id', id);
        }
      },
      decreaseCount: async (id: string) => {
        const cartItem = get().cart.find((i) => i.itemId === id);
        if (!cartItem || cartItem.count <= 1) return;

        set((state) => ({
          cart: state.cart.map((item) =>
            item.itemId === id ? { ...item, count: item.count - 1 } : item,
          ),
        }));

        const user = useAuth.getState().user;
        if (user) {
          await supabase
            .from('cart_items')
            .update({ count: cartItem.count - 1 })
            .eq('user_id', user.id)
            .eq('item_id', id);
        }
      },
      clearCart: async () => {
        set({ cart: [] });
        const user = useAuth.getState().user;
        if (user) {
          await supabase.from('cart_items').delete().eq('user_id', user.id);
        }
      },
    }),
    {
      name: 'cart',
    },
  ),
);
