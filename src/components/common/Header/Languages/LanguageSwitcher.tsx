import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/i18n/language';
import styles from './LanguageSwitcher.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';
import { Switcher } from '../../Switcher';

type Props = {
  size?: '48' | '64';
  isMobile?: boolean;
};

export const LanguageSwitcher: React.FC<Props> = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === 'ua') {
      i18n.changeLanguage(Language.EN);
    } else {
      i18n.changeLanguage(Language.UA);
    }
  };

  return (
    <div
      className={styles.switcher_container}
      onClick={changeLanguage}
    >
      <Typography
        variant="small"
        className={styles.text}
      >
        UA
      </Typography>
      <Switcher condition={i18n.language === 'ua'} />
      <Typography
        variant="small"
        className={styles.text}
      >
        EN
      </Typography>
    </div>
  );
};
