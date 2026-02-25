import { create } from 'zustand';

export type ToastType = 'success' | 'info' | 'error';

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
  isLeaving?: boolean;
  icon?: 'cart' | 'heart' | 'info';
}

interface ToastState {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id' | 'duration'>) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast: (toast) => {
    const id = Date.now();
    const duration = 3000;

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id, duration }],
    }));
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, isLeaving: true } : t,
      ),
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 250);
  },
}));
