import React from 'react';
import classNames from 'classnames';
import styles from './Typography.module.scss';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'uppercase'
  | 'buttons'
  | 'body'
  | 'small';

type Color = 'primary' | 'secondary' | 'red' | 'green' | 'white' | 'icons';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'label';

interface Props {
  variant: Variant;
  tag?: Tag;
  className?: string;
  color?: Color;
  children: React.ReactNode;
}

export const Typography: React.FC<Props> = ({
  variant,
  tag,
  className,
  color = 'primary',
  children,
}) => {
  const Tag = tag || getDefaultTag(variant);

  return (
    // eslint-disable-next-line react-hooks/static-components
    <Tag
      className={classNames(
        styles.text,
        styles[variant],
        styles[color],
        className,
      )}
    >
      {children}
    </Tag>
  );
};

const getDefaultTag = (variant: Variant): Tag => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'uppercase':
      return 'p';
    case 'buttons':
      return 'span';
    case 'body':
      return 'p';
    case 'small':
      return 'p';
    default:
      return 'p';
  }
};
