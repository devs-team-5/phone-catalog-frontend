import React, { createContext, useContext, useEffect, useState } from 'react';

type FavouritesContextType = {
  favourites: string[];
  addToFavourites: (id: string) => void;
  removeFromFavourites: (id: string) => void;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => void;
  getFavouritesCount: () => number;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const storedFavourites = localStorage.getItem('favourites');
      return storedFavourites ? JSON.parse(storedFavourites) : [];
    } catch (error) {
      console.error('Failed to parse favourites from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (id: string) => {
    setFavourites((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeFromFavourites = (id: string) => {
    setFavourites((prev) => prev.filter((favId) => favId !== id));
  };

  const isFavourite = (id: string) => favourites.includes(id);

  const toggleFavourite = (id: string) => {
    if (isFavourite(id)) {
      removeFromFavourites(id);
    } else {
      addToFavourites(id);
    }
  };

  const getFavouritesCount = () => favourites.length;

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        toggleFavourite,
        getFavouritesCount,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
