import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/utils/supabaseClient';
import { useAuth } from './auth';

type FavouritesState = {
  favourites: string[];
  addToFavourites: (id: string) => void;
  removeFromFavourites: (id: string) => void;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => void;
  getFavouritesCount: () => number;
  syncWithServer: (items: string[]) => void;
};

export const useFavourites = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],
      syncWithServer: (items) => set({ favourites: items }),
      addToFavourites: async (id: string) => {
        set((state) => ({ favourites: [...state.favourites, id] }));
        const user = useAuth.getState().user;
        if (user) {
          await supabase.from('favorites').insert({
            user_id: user.id,
            item_id: id,
          });
        }
      },
      removeFromFavourites: async (id: string) => {
        set((state) => ({
          favourites: state.favourites.filter((favId) => favId !== id),
        }));
        const user = useAuth.getState().user;
        if (user) {
          await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('item_id', id);
        }
      },
      isFavourite: (id: string) => {
        return get().favourites.includes(id);
      },
      toggleFavourite: (id: string) => {
        const { isFavourite, addToFavourites, removeFromFavourites } = get();
        if (isFavourite(id)) {
          removeFromFavourites(id);
        } else {
          addToFavourites(id);
        }
      },
      getFavouritesCount: () => {
        return get().favourites.length;
      },
    }),
    {
      name: 'favourites',
    },
  ),
);
