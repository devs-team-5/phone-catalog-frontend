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
} from 'react-icons/lu';

export const ICON_MAP = {
  DARKTHEME: LuMoon,
  LIGHTTHEME: LuSun,
  HOME: LuHouse,
  SEARCH: LuSearch,
  CART: LuShoppingBag,
  WISHLIST: LuHeart,
  MINUS_GRAY: () => <LuMinus color="#B4BDC3" />,
  PLUS_GRAY: () => <LuPlus color="#B4BDC3" />,
  CLOSE_GRAY: () => <LuX color="#B4BDC3" />,
  MINUS: LuMinus,
  PLUS: LuPlus,
  CLOSE: LuX,
  MENU: LuMenu,
  WISHLIST_RED: () => (
    <LuHeart
      color="#EB5757"
      fill="#EB5757"
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
