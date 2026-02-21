import { Swiper, SwiperSlide } from 'swiper/react';
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
            mousewheel={{ forceToAxis: true }}
            className={styles['home-slider__swiper']}
          >
            {STATIC_IMAGES.banners.homeSlider.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  slot="container-start"
                  className={styles['home-slider__bg']}
                  style={{ backgroundImage: `url(${bgImage})` }}
                  data-swiper-parallax="-20%"
                ></div>

                <div className={styles['home-slider__slide-content']}>
                  <img
                    src={slide}
                    alt={`Banner ${index + 1}`}
                    className={styles['home-slider__img']}
                  />
                </div>
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
