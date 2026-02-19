import { ICON_MAP } from '@/components/ui/Icon/icons';
import logo from '@/assets/nice_gadgets_logo.svg';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logo}>
        <a href="#">
          <img
            src={logo}
            alt="NICE GADGETS"
            className={styles.footer__logo_img}
          />
        </a>
      </div>

      <nav className={styles.footer__nav}>
        <a
          href="#"
          className={styles.footer__link}
        >
          <Typography
            variant="uppercase"
            color="secondary"
          >
            Github
          </Typography>
        </a>
        <a
          href="#"
          className={styles.footer__link}
        >
          <Typography
            variant="uppercase"
            color="secondary"
          >
            Contacts
          </Typography>
        </a>
        <a
          href="#"
          className={styles.footer__link}
        >
          <Typography
            variant="uppercase"
            color="secondary"
          >
            Rights
          </Typography>
        </a>
      </nav>

      <div className={styles.footer__back_to_top}>
        <Typography
          variant="small"
          color="secondary"
          tag="span"
        >
          Back to top
        </Typography>

        <button
          className={styles.footer__back_button}
          aria-label="Scroll to top"
        >
          <ICON_MAP.CHEVRON_UP />
        </button>
      </div>
    </footer>
  );
};
