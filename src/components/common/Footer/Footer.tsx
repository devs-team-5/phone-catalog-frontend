import { Link } from 'react-router-dom';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import logo from '@/assets/nice_gadgets_logo.svg';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__line}></div>

      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <Link to="/">
            <img
              src={logo}
              alt="NICE GADGETS"
              className={styles.footer__logo_img}
            />
          </Link>
        </div>

        <nav className={styles.footer__nav}>
          <a
            href="https://github.com/devs-team-5/phone-catalog-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            <Typography
              variant="uppercase"
              color="secondary"
            >
              footer.github
            </Typography>
          </a>
          <Link
            to="/"
            className={styles.footer__link}
          >
            <Typography
              variant="uppercase"
              color="secondary"
            >
              footer.contacts
            </Typography>
          </Link>
          <Link
            to="/"
            className={styles.footer__link}
          >
            <Typography
              variant="uppercase"
              color="secondary"
            >
              footer.rights
            </Typography>
          </Link>
        </nav>

        <div className={styles.footer__back_to_top}>
          <Typography
            variant="small"
            color="secondary"
            tag="span"
          >
            footer.backToTop
          </Typography>

          <button
            type="button"
            className={styles.footer__back_button}
            aria-label="Scroll to top"
            onClick={scrollToTop}
          >
            <ICON_MAP.CHEVRON_UP />
          </button>
        </div>
      </div>
    </footer>
  );
};
