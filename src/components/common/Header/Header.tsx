import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';
import './Header.scss';
import logo from '@/assets/nice_gadgets_logo.png';
import { Typography } from '@/components/ui/Typography/Typography';
import { Icon } from '@/components/ui/Icon/Icon';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__flex">
        <div className="header__logo">
          {/* добавити а */}
          <img
            src={logo}
            alt="Nice Gadgets"
          />
        </div>

        <nav className="header__nav">
          <ul className="header__menu">
            <li>
              <Typography
                color="secondary"
                variant="uppercase"
              >
                HOME
              </Typography>
            </li>
            <li>
              <Typography
                color="secondary"
                variant="uppercase"
              >
                PHONES
              </Typography>
            </li>
            <li>
              <Typography
                color="secondary"
                variant="uppercase"
              >
                TABLETS
              </Typography>
            </li>
            <li>
              <Typography
                color="secondary"
                variant="uppercase"
              >
                ACCESSORIES
              </Typography>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <BadgeIcon
            name="WISHLIST"
            count={2}
          />
          <BadgeIcon
            name="CART"
            count={3}
          />
        </div>

        <div className="header__burger">
          <Icon
            name="MENU"
            size={24}
          />
        </div>
      </div>
    </header>
  );
};
