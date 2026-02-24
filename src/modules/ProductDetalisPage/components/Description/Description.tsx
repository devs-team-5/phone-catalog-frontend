import React, { useState } from 'react';
import styles from './Description.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';
import type { About } from '@/types/About';
import type { MainSpecs } from '@/types/MainSpecs';
import { useTranslation } from 'react-i18next';

type DescriptionProps = {
  about: About[];
  specs: MainSpecs[];
};

export const Description: React.FC<DescriptionProps> = ({ about, specs }) => {
  const { t, i18n } = useTranslation();
  const [showOriginal, setShowOriginal] = useState(false);

  const isUkrainian = i18n.language.startsWith('ua');
  const shouldShowDescription = !isUkrainian || showOriginal;
  console.log('LANG:', i18n.language);

  return (
    <>
      <section className={styles.about}>
        <Typography
          variant="h3"
          className={styles.title}
        >
          {t('product.about')}
        </Typography>

        <hr className={styles.line} />

        {isUkrainian && !showOriginal && (
          <button
            className={styles.readBtn}
            onClick={() => setShowOriginal(true)}
          >
            {t('product.readOriginal')}
          </button>
        )}

        {shouldShowDescription &&
          about.map(({ text, title }) => (
            <article
              className={styles.article}
              key={title}
            >
              <Typography
                variant="h4"
                className={styles.title}
              >
                {title}
              </Typography>

              <Typography
                variant="body"
                color="secondary"
              >
                {text}
              </Typography>
            </article>
          ))}

        {isUkrainian && showOriginal && (
          <button
            className={styles.readBtn}
            onClick={() => setShowOriginal(false)}
          >
            {t('product.hideOriginal')}
          </button>
        )}
      </section>

      <section className={styles.specs}>
        <Typography
          variant="h3"
          className={styles.title_tech}
        >
          {t('product.techSpecs')}
        </Typography>

        <hr className={styles.line} />

        {specs.map(({ label, value }) =>
          value ?
            <article
              className={styles.tech}
              key={label}
            >
              <Typography
                variant="body"
                color="secondary"
              >
                {label}
              </Typography>

              <Typography variant="body">{value}</Typography>
            </article>
          : null,
        )}
      </section>
    </>
  );
};
