import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavouritesState = {
  favourites: string[];
  addToFavourites: (id: string) => void;
  removeFromFavourites: (id: string) => void;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => void;
  getFavouritesCount: () => number;
};

export const useFavourites = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],
      addToFavourites: (id: string) => {
        set((state) => ({ favourites: [...state.favourites, id] }));
      },
      removeFromFavourites: (id: string) => {
        set((state) => ({
          favourites: state.favourites.filter((favId) => favId !== id),
        }));
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
