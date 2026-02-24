import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';
import styles from './Header.module.scss';
import logo from '@/assets/nice_gadgets_logo.svg';
import darkLogo from '@/assets/nice_gadgets_logo_dark.svg';
import { Icon } from '@/components/ui/Icon/Icon';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button';
import { useFavourites } from '@/hooks/favourites';
import { useCart } from '@/hooks/cart';
import { useAuth } from '@/context/AuthContext';
import { useThemeStore } from '@/hooks/ThemeStore';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import { SearchInput } from '../SearchInput';

export const Header = () => {
  const { getFavouritesCount } = useFavourites();
  const { getCartCount } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navBar}>
            <Link
              to="/"
              className={styles.logo}
            >
              <img
                src={isDark ? darkLogo : logo}
                alt="Nice Gadgets"
              />
            </Link>

            <nav className={styles.nav}>
              <ul className={styles.menu}>
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.isActive : ''}`
                    }
                  >
                    <Typography
                      variant="uppercase"
                      color="inherit"
                    >
                      Home
                    </Typography>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.isActive : ''}`
                    }
                    to={'/phones'}
                  >
                    <Typography
                      variant="uppercase"
                      color="inherit"
                    >
                      Phones
                    </Typography>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.isActive : ''}`
                    }
                    to="/tablets"
                  >
                    <Typography
                      variant="uppercase"
                      color="inherit"
                    >
                      Tablets
                    </Typography>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.isActive : ''}`
                    }
                    to="/accessories"
                  >
                    <Typography
                      variant="uppercase"
                      color="inherit"
                    >
                      Accessories
                    </Typography>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.actions_container}>
            <SearchInput />
            <div className={styles.actions}>
              <ThemeSwitcher />

              <Link to="/favourites">
                <Button size="64">
                  <BadgeIcon
                    name="WISHLIST"
                    count={getFavouritesCount()}
                  />
                </Button>
              </Link>

              <Link to="/cart">
                <Button size="64">
                  <BadgeIcon
                    name="CART"
                    count={getCartCount()}
                  />
                </Button>
              </Link>

              <div className={styles.userSection}>
                {isLoggedIn ?
                  <div className={styles.accountInfo}>
                    <Typography
                      variant="small"
                      color="secondary"
                    >
                      {user?.username || user?.email}
                    </Typography>
                    <button
                      onClick={handleLogout}
                      className={styles.logoutBtn}
                      title="Logout"
                    >
                      <Icon
                        name="CLOSE"
                        size={20}
                      />
                    </button>
                  </div>
                : <Link
                    to="/login"
                    className={styles.loginLink}
                  >
                    <Button size="64">
                      <Icon
                        name="USER"
                        size={20}
                      />
                    </Button>
                  </Link>
                }
              </div>
            </div>

            <div className={styles.burger}>
              <button onClick={() => setIsMenuOpen(true)}>
                <Icon
                  name="MENU"
                  size={24}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        cartCount={getCartCount()}
        favouritesCount={getFavouritesCount()}
      />
    </>
  );
};
