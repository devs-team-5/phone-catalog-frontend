import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (value: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () =>
        set((state) => {
          const newValue = !state.isDark;
          document.documentElement.classList.toggle('dark', newValue);
          return { isDark: newValue };
        }),
      setDark: (value: boolean) =>
        set(() => {
          document.documentElement.classList.toggle('dark', value);
          return { isDark: value };
        }),
    }),
    {
      name: 'theme',
    },
  ),
);
