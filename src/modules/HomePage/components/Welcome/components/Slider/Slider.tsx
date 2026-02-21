import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import {
  Parallax,
  Pagination,
  Navigation,
  Autoplay,
  Mousewheel,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Slider.module.scss';
import bgImage from '@/assets/images/bg/bg.jpg';
import { Typography } from '@/components/ui/Typography/Typography';

const SLIDES = [
  {
    image:
      'https://mbaorksskenilesfexla.supabase.co/storage/v1/object/public/catalog_images/phones/apple-iphone-17-pro-max/cosmicorange/00.webp',
    link: '/phones/apple-iphone-17-pro-max-1tb-cosmicorange',
    text: 'Your next Apple. Here.',
  },
  {
    image:
      'https://mbaorksskenilesfexla.supabase.co/storage/v1/object/public/catalog_images/phones/apple-iphone-13-pro-max/sierrablue/00.webp',
    link: '/phones/apple-iphone-13-pro-max-256gb-sierrablue',
    text: 'Pure Apple. Simply delivered.',
  },
  {
    image:
      'https://mbaorksskenilesfexla.supabase.co/storage/v1/object/public/catalog_images/phones/apple-iphone-air/spaceblack/00.webp',
    link: '/phones/apple-iphone-air-256gb-spaceblack',
    text: 'The store you love.',
  },
  {
    image:
      'https://mbaorksskenilesfexla.supabase.co/storage/v1/object/public/catalog_images/accessories/apple-watch-series-6/blue/00.webp',
    link: '/accessories/apple-watch-series-6-44mm-blue',
    text: 'Designed for you.',
  },
  {
    image:
      'https://mbaorksskenilesfexla.supabase.co/storage/v1/object/public/catalog_images/phones/apple-iphone-17/white/00.webp',
    link: '/phones/apple-iphone-17-512gb-white',
    text: 'Authentic. Simple. Yours.',
  },
  {
    image:
      'https://mbaorksskenilesfexla.supabase.co/storage/v1/object/public/catalog_images/phones/apple-iphone-14/purple/00.webp',
    link: '/phones/apple-iphone-14-512gb-purple',
    text: 'Simply perfection.',
  },
];
import { STATIC_IMAGES } from '@/constants/images';
import { ICON_MAP } from '@/components/ui/Icon/icons';

export const Slider = () => {
  return (
    <section className={styles['home-slider']}>
      <div className={styles['home-slider__content']}>
        <button
          className={`${styles['home-slider__nav-btn']} home-slider__nav-btn--prev`}
        >
          <ICON_MAP.CHEVRON_LEFT className={styles.buttons} />
        </button>

        <div className={styles['home-slider__container']}>
          <Swiper
            modules={[Parallax, Pagination, Navigation, Autoplay, Mousewheel]}
            speed={1200}
            parallax={true}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: `.${styles['home-slider__pagination']}`,
            }}
            navigation={{
              nextEl: '.home-slider__nav-btn--next',
              prevEl: '.home-slider__nav-btn--prev',
            }}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
            }}
            mousewheel={{ forceToAxis: true }}
            className={styles['home-slider__swiper']}
          >
            {SLIDES.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  slot="container-start"
                  className={styles['home-slider__bg']}
                  style={{ backgroundImage: `url(${bgImage})` }}
                  data-swiper-parallax="-20%"
                ></div>
                <Link
                  to={slide.link}
                  className={styles['home-slider__slide-content']}
                >
                  <Typography
                    variant="h2"
                    color="primary"
                    className={styles['home-slider__text']}
                  >
                    {slide.text}
                  </Typography>
                  <img
                    src={slide.image}
                    alt={`Banner ${index + 1}`}
                    className={styles['home-slider__img']}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          className={`${styles['home-slider__nav-btn']} home-slider__nav-btn--next`}
        >
          <ICON_MAP.CHEVRON_RIGHT className={styles.buttons} />
        </button>
      </div>

      <div className={styles['home-slider__pagination-wrapper']}>
        <div className={styles['home-slider__pagination']}></div>
      </div>
    </section>
  );
};
