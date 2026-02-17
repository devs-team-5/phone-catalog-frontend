import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  BUTTON_SHAPES,
  BUTTON_COLORS,
  type ButtonSize,
  type ButtonVariant,
  type ButtonShape,
  type ButtonColor,
} from './constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  baseColor?: ButtonColor;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> & {
  Size: typeof BUTTON_SIZES;
  Variant: typeof BUTTON_VARIANTS;
  Shape: typeof BUTTON_SHAPES;
  Color: typeof BUTTON_COLORS;
} = ({
  size = 32,
  variant = 'default',
  shape = 'square',
  baseColor,
  children,
  className,
  style,
  ...props
}) => {
  const sizeValue = BUTTON_SIZES[size as keyof typeof BUTTON_SIZES];

  const buttonClasses = clsx(
    styles.button,
    styles[`button--size-${sizeValue}`],
    styles[`button--${shape}`],
    styles[`button--${variant}`],
    className,
  );

  const customStyle =
    baseColor ?
      { ...style, backgroundColor: `#${BUTTON_COLORS[baseColor]}` }
    : style;

  return (
    <button
      className={buttonClasses}
      style={customStyle}
      {...props}
    >
      {children}
    </button>
  );
};

Button.Size = BUTTON_SIZES;
Button.Variant = BUTTON_VARIANTS;
Button.Shape = BUTTON_SHAPES;
Button.Color = BUTTON_COLORS;
