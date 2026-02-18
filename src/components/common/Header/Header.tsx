import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';
import styles from './Header.module.scss';
import logo from '@/assets/nice_gadgets_logo.svg';
import { Icon } from '@/components/ui/Icon/Icon';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MobileMenu } from './MobileMenu/MobileMenu';

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
            <a href="#">
              <img
                src={logo}
                alt="Nice Gadgets"
              />
            </a>
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
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.isActive : ''}`
                  }
                  to="/phones"
                >
                  Phones
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.isActive : ''}`
                  }
                  to="/tablets"
                >
                  Tablets
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.isActive : ''}`
                  }
                  to="/accessories"
                >
                  Accessories
                </NavLink>
              </li>
              <li>
                <Link to="/test">TEST</Link>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link to="/favorites">
              <BadgeIcon
                name="WISHLIST"
                count={2}
              />
            </Link>
            <Link to="/cart">
              <BadgeIcon
                name="CART"
                count={3}
              />
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
