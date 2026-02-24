import {
  LuHouse,
  LuSearch,
  LuShoppingBag,
  LuHeart,
  LuMinus,
  LuPlus,
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuChevronDown,
  LuChevronUp,
  LuMenu,
  LuMoon,
  LuSun,
  LuUser,
  LuLinkedin,
  LuPhone,
  LuMail,
} from 'react-icons/lu';

export const ICON_MAP = {
  DARKTHEME: LuMoon,
  MAIL: LuMail,
  PHONE: LuPhone,
  LINKEDIN: LuLinkedin,
  LIGHTTHEME: LuSun,
  HOME: LuHouse,
  SEARCH: LuSearch,
  CART: LuShoppingBag,
  WISHLIST: LuHeart,
  USER: LuUser,
  MINUS_GRAY: () => <LuMinus color="$icons-color" />,
  PLUS_GRAY: () => <LuPlus color="$icons-color" />,
  CLOSE_GRAY: () => <LuX color="#B4BDC3" />,
  MINUS: LuMinus,
  PLUS: LuPlus,
  CLOSE: LuX,
  MENU: LuMenu,
  WISHLIST_RED: () => (
    <LuHeart
      color="var(--red-color)"
      fill="var(--red-color)"
    />
  ),
  CHEVRON_LEFT_GRAY: () => <LuChevronLeft color="#B4BDC3" />,
  CHEVRON_RIGHT_GRAY: () => <LuChevronRight color="#B4BDC3" />,
  CHEVRON_DOWN_GRAY: () => <LuChevronDown color="#B4BDC3" />,
  CHEVRON_UP_GRAY: () => <LuChevronUp color="#B4BDC3" />,
  CHEVRON_LEFT: LuChevronLeft,
  CHEVRON_RIGHT: LuChevronRight,
  CHEVRON_DOWN: LuChevronDown,
  CHEVRON_UP: LuChevronUp,
} as const;
