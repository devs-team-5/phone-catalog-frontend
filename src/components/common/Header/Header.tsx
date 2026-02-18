import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';
import styles from './Header.module.scss';
import logo from '@/assets/nice_gadgets_logo.svg';
import { Icon } from '@/components/ui/Icon/Icon';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <>
    <header className={styles.header}>
      <div className={styles.flex}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={logo}
              alt="Nice Gadgets"
            />
          </Link>
        </div>

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
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.isActive : ''}`
                }
                to="/test"
              >
                <Typography
                  variant="uppercase"
                  color="red"
                >
                  Test
                </Typography>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link to="/favourites">
            <Button size="64">
              <BadgeIcon name="WISHLIST" />
            </Button>
          </Link>
          <Link to="/cart">
            <Button size="64">
              <BadgeIcon name="CART" />
            </Button>
          </Link>
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
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};
