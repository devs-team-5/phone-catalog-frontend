import { Switcher } from '@/components/common/Switcher';
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
      <Switcher condition={isDark} />
      <ICON_MAP.LIGHTTHEME />
    </div>
  );
};
