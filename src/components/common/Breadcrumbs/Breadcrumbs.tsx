import type React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import styles from './Breadcrumbs.module.scss';
import { Fragment } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split('/')
    .filter((segment) => segment);

  return (
    <nav aria-label="Breadcrumb">
      <ul className={styles.breadcrumbs}>
        <li className={styles.breadcrumbs__item}>
          <Link
            to="/"
            className={styles.breadcrumbs__link}
            aria-label="Home"
          >
            <ICON_MAP.HOME />
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

          const formatSegment = (text: string) => {
            return text.charAt(0).toUpperCase() + text.slice(1);
          };

          return (
            <Fragment key={path}>
              <li
                className={styles.breadcrumbs__separator}
                aria-hidden="true"
              >
                <ICON_MAP.CHEVRON_RIGHT_GRAY />
              </li>
              <li className={styles.breadcrumbs__item}>
                {isLast ?
                  <Typography
                    variant="small"
                    tag="span"
                    color="secondary"
                    className={styles.breadcrumbs__text}
                  >
                    {formatSegment(segment)}
                  </Typography>
                : <Link
                    to={path}
                    className={styles.breadcrumbs__link}
                  >
                    <Typography
                      variant="small"
                      tag="span"
                      color="primary"
                      className={styles.breadcrumbs__text}
                    >
                      {formatSegment(segment)}
                    </Typography>
                  </Link>
                }
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
