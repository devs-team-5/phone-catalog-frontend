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
  PURPLE: '5E5CE6',
  SPACEBLACK: '1C1C1E',
  BLACK: '000000',
  SILVER: 'F5F5F7',
  SPACEGRAY: '8E8E93',
  MIDNIGHTGREEN: '4E5851',
  GRAPHITE: '2C2C2E',
  GOLD: 'E7C9A9',
  SIERRABLUE: 'A7C7E7',
  YELLOW: 'FFD60A',
  MIDNIGHT: '191970',
  BLUE: '007AFF',
  PINK: 'FF9EB5',
  ROSEGOLD: 'B76E79',
  CORAL: 'FF6F61',
  STARLIGHT: 'F4EAD5',
  SKYBLUE: '#A7C7E7',
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;
export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];
export type ButtonShape = (typeof BUTTON_SHAPES)[keyof typeof BUTTON_SHAPES];
export type ButtonColor = keyof typeof BUTTON_COLORS;
