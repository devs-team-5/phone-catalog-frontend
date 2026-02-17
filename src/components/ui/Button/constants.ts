export const BUTTON_SIZES = {
  '32': '32',
  '40': '40',
  '48': '48',
  '64': '64',
} as const;

export const BUTTON_VARIANTS = {
  DEFAULT: 'default',
  SELECTED: 'selected',
} as const;

export const BUTTON_SHAPES = {
  SQUARE: 'square',
  CIRCLE: 'circle',
} as const;

export const BUTTON_COLORS = {
  PRIMARY: '313237',
  SECONDARY: '89939A',
  ICONS: 'B4BDC3',
  ELEMENTS: 'E2E6E9',
  HOVER_BG: 'FAFBFC',
  WHITE: 'FFFFFF',
  GREEN: '27AE60',
  RED: 'EB5757',
  // Кольори для вибору товару
  SAND: 'FCDBC1',
  GREY: '5F6661',
  DARK: '4C4C4C',
  LIGHT: 'F0F0F0',
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;
export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];
export type ButtonShape = (typeof BUTTON_SHAPES)[keyof typeof BUTTON_SHAPES];
export type ButtonColor = keyof typeof BUTTON_COLORS;
