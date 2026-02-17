import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';
import './Header.scss';
import logo from '@/assets/nice_gadgets_logo.svg';
import { Typography } from '@/components/ui/Typography/Typography';
import { Icon } from '@/components/ui/Icon/Icon';
import { Link } from 'react-router';

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
              <a href="#1">
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  HOME
                </Typography>
              </a>
            </li>
            <li>
              <a href="#2">
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  PHONES
                </Typography>
              </a>
            </li>
            <li>
              <a href="#3">
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  TABLETS
                </Typography>
              </a>
            </li>
            <li>
              <a href="#4">
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  ACCESSORIES
                </Typography>
              </a>
            </li>
            <li>
              <Link to="/test">
                <Typography
                  color="secondary"
                  variant="uppercase"
                >
                  Test
                </Typography>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <a href="#1">
            <BadgeIcon
              name="WISHLIST"
              count={2}
            />
          </a>
          <a href="#1">
            <BadgeIcon
              name="CART"
              count={3}
            />
          </a>
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
