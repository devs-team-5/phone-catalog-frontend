import styles from './ThemeSwitcher.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { useThemeStore } from '@/hooks/ThemeStore';

export const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div
      className={styles.switcher_container}
      onClick={toggleTheme}
    >
      <ICON_MAP.DARKTHEME />
      <button className={styles.switchTheme}>
        <div
          className={styles.switcher}
          style={{
            transition: 'transform 0.3s',
            transform: isDark ? 'translateX(0)' : 'translateX(90%)',
          }}
        ></div>
      </button>
      <ICON_MAP.LIGHTTHEME />
    </div>
  );
};
