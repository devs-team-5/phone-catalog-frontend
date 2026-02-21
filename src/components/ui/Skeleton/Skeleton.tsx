import type React from 'react';
import classNames from 'classnames';
import styles from './Skeleton.module.scss';

type Props = {
  className?: string;
};

export const Skeleton: React.FC<Props> = ({ className }) => {
  return <div className={classNames(styles.skeleton, className)} />;
};
