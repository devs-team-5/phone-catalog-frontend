/* eslint-disable react-hooks/static-components */
import React from 'react';
import classNames from 'classnames';
import styles from './Typography.module.scss';
import { useTranslation } from 'react-i18next';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'uppercase'
  | 'buttons'
  | 'body'
  | 'small'
  | 'line-through';

type Color =
  | 'primary'
  | 'secondary'
  | 'red'
  | 'green'
  | 'white'
  | 'icons'
  | 'inherit';

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
  const { t, i18n } = useTranslation<'translation'>();
  const hasTranslation = i18n.exists(children?.toString() as string);

  const Tag = tag || getDefaultTag(variant);

  if (variant === 'line-through') {
    return (
      <div className={classNames(styles.lineThroughWrapper, className)}>
        <Tag className={classNames(styles.text, styles.lineThroughText)}>
          {hasTranslation ? t(children?.toString() as string) : children}
        </Tag>
      </div>
    );
  }

  return (
    <Tag
      className={classNames(
        styles.text,
        styles[variant],
        styles[color],
        className,
      )}
    >
      {hasTranslation ? t(children?.toString() as string) : children}
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
    case 'line-through':
      return 'span';
    default:
      return 'p';
  }
};
