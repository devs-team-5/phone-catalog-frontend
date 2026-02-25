import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Parallax, Pagination, Navigation, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Slider.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';

const SLIDES = [
  {
    video: 'introducing-iPhone-17-Pro.mp4',
    link: '/phones/apple-iphone-17-pro-max-1tb-cosmicorange',
  },
  {
    img: 'https://www.apple.com/v/iphone-17-pro/d/images/overview/welcome/hero_endframe__xdzisdq1ppem_xlarge.jpg',
    link: '/phones/apple-iphone-17-pro-max-1tb-cosmicorange',
  },
  {
    img: 'newModels.jpg',
    link: '/phones/apple-iphone-17-pro-max-1tb-cosmicorange',
  },
];

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
            modules={[Parallax, Pagination, Navigation, Mousewheel]}
            speed={1200}
            parallax={true}
            loop={true}
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
            {SLIDES.map((slide, index) =>
              slide.video ?
                <SwiperSlide key={index}>
                  <Link to={slide.link}>
                    <video
                      autoPlay
                      src={slide.video}
                      muted
                      loop
                      playsInline
                      // alt={`Banner ${index + 1}`}
                      className={styles['home-slider__img']}
                    />
                  </Link>
                </SwiperSlide>
              : <SwiperSlide key={index}>
                  <Link to={slide.link}>
                    <img
                      src={slide.img}
                      alt={`Banner ${index + 1}`}
                      className={styles['home-slider__img']}
                    />
                  </Link>
                </SwiperSlide>,
            )}
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
