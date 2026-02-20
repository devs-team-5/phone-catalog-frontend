import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (id: string) => {
        set((state) => ({ cart: [...state.cart, { itemId: id, count: 1 }] }));
      },
      removeFromCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.itemId !== id),
        }));
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
      increaseCount: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.itemId === id ? { ...item, count: item.count + 1 } : item,
          ),
        }));
      },
      decreaseCount: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.itemId === id && item.count > 1 ?
              { ...item, count: item.count - 1 }
            : item,
          ),
        }));
      },
    }),
    {
      name: 'cart',
    },
  ),
);
