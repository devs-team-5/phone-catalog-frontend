import { create } from 'zustand';

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (value: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () =>
    set((state) => {
      const newValue = !state.isDark;
      document.documentElement.classList.toggle('dark', newValue);
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      return { isDark: newValue };
    }),
  setDark: (value) =>
    set(() => {
      document.documentElement.classList.toggle('dark', value);
      localStorage.setItem('theme', value ? 'dark' : 'light');
      return { isDark: value };
    }),
}));
