import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';
import './Header.scss';
import logo from '@/assets/nice_gadgets_logo.svg';
import { Typography } from '@/components/ui/Typography/Typography';
import { Icon } from '@/components/ui/Icon/Icon';
import { Link, NavLink } from 'react-router';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__flex">
        <div className="header__logo">
          <a href="#">
            <img
              src={logo}
              alt="Nice Gadgets"
            />
          </a>
        </div>

        <nav className="header__nav">
          <ul className="header__menu">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  Home
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  Phones
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  Tablets
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  Accessories
                </Typography>
              </NavLink>
            </li>
            <li>
              <Link to="/test">
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  TEST
                </Typography>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
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

        <div className="header__burger">
          <a href="#">
            <Icon
              name="MENU"
              size={24}
            />
          </a>
        </div>
      </div>
    </header>
  );
};
