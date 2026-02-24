import type React from 'react';
import styles from './Switcher.module.scss';

type Props = {
  condition: boolean;
};

export const Switcher: React.FC<Props> = ({ condition }) => {
  return (
    <button className={styles.switchTheme}>
      <div
        className={styles.switcher}
        style={{
          transition: 'transform 0.3s',
          transform: condition ? 'translateX(0)' : 'translateX(90%)',
        }}
      ></div>
    </button>
  );
};
