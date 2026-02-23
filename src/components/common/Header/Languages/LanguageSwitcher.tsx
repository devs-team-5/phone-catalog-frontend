import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/i18n/language';
import { Icon } from '@/components/ui/Icon/Icon';
import { Button } from '@/components/ui/Button';
import styles from './LanguageSwitcher.module.scss';
import cn from 'classnames';

type Props = {
  size?: '48' | '64';
  isMobile?: boolean;
};

export const LanguageSwitcher: React.FC<Props> = ({
  size = '64',
  isMobile = false,
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className={cn(styles.wrapper, {
        [styles.mobile]: isMobile,
      })}
    >
      <Button
        size={size}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon name="LANGUAGE" />
      </Button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button onClick={() => changeLanguage(Language.EN)}>English</button>
          <button onClick={() => changeLanguage(Language.UA)}>
            Українська
          </button>
        </div>
      )}
    </div>
  );
};
