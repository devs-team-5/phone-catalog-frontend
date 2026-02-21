import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import logo from '@/assets/nice_gadgets_logo.svg';
import darkLogo from '@/assets/nice_gadgets_logo_dark.svg';
import { Icon } from '@/components/ui/Icon/Icon';
import { Typography } from '@/components/ui/Typography/Typography';

import styles from './MobileMenu.module.scss';
import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';
import { useThemeStore } from '@/hooks/ThemeStore';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  favouritesCount: number;
};

export const MobileMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  cartCount,
  favouritesCount,
}) => {
  const { isDark } = useThemeStore();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.link, {
      [styles.active]: isActive,
    });

  const getBottomLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.bottomLink, {
      [styles.bottomActive]: isActive,
    });

  return (
    <div className={cn(styles.wrapper, { [styles.open]: isOpen })}>
      <div
        className={styles.overlay}
        onClick={onClose}
      />

      <div className={styles.panel}>
        <div className={styles.top}>
          <NavLink
            to="/"
            onClick={onClose}
            className={styles.logo}
          >
            <img
              src={isDark ? darkLogo : logo}
              alt="Nice Gadgets"
            />
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            <Icon
              name="CLOSE"
              size={24}
            />
          </button>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={getLinkClass}
            onClick={onClose}
          >
            <Typography
              variant="uppercase"
              color="inherit"
              className={styles.menuItem}
            >
              Home
            </Typography>
          </NavLink>

          <NavLink
            to="/phones"
            className={getLinkClass}
            onClick={onClose}
          >
            <Typography
              variant="uppercase"
              color="inherit"
              className={styles.menuItem}
            >
              Phones
            </Typography>
          </NavLink>

          <NavLink
            to="/tablets"
            className={getLinkClass}
            onClick={onClose}
          >
            <Typography
              variant="uppercase"
              color="inherit"
              className={styles.menuItem}
            >
              Tablets
            </Typography>
          </NavLink>

          <NavLink
            to="/accessories"
            className={getLinkClass}
            onClick={onClose}
          >
            <Typography
              variant="uppercase"
              color="inherit"
              className={styles.menuItem}
            >
              Accessories
            </Typography>
          </NavLink>
        </nav>

        <div className={styles.bottom}>
          <NavLink
            to="/favourites"
            onClick={onClose}
            className={getBottomLinkClass}
          >
            <BadgeIcon
              name="WISHLIST"
              count={favouritesCount}
            />
          </NavLink>

          <NavLink
            to="/cart"
            onClick={onClose}
            className={getBottomLinkClass}
          >
            <BadgeIcon
              name="CART"
              count={cartCount}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
