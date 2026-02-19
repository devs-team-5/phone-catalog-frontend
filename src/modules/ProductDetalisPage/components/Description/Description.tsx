import React from 'react';
import styles from './Description.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';
import type { About } from '@/types/About';
import type { MainSpecs } from '@/types/MainSpecs';

type DescriptionProps = {
  about: About[];
  specs: MainSpecs[];
};

export const Description: React.FC<DescriptionProps> = ({ about, specs }) => {
  return (
    <>
      <section className={styles.about}>
        <Typography
          variant="h3"
          className={styles.title}
        >
          About
        </Typography>
        <hr className={styles.line} />
        {about.map((desc) => {
          const { text, title } = desc;

          return (
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
          );
        })}
      </section>

      <section className={styles.specs}>
        <Typography
          variant="h3"
          className={styles.title_tech}
        >
          Tech specs
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
