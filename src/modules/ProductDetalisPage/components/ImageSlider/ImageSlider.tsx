import { Autoplay, FreeMode, Thumbs } from 'swiper/modules';
import styles from './ImageSlider.module.scss';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';
import React, { useState } from 'react';

type Props = {
  images: string[];
  getImageUrl: (newImages: string) => string;
};

export const ImageSlider: React.FC<Props> = ({ images, getImageUrl }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={styles.product_gallery_wrapper}>
      <div className={styles.thumbs_container}>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="horizontal"
          spaceBetween={8}
          slidesPerView={Math.min(images.length, 5)}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className={styles.myThumbsSlider}
          observer={true}
          observeParents={true}
          breakpoints={{
            640: {
              direction: 'vertical',
            },
          }}
        >
          {images.map((img) => (
            <SwiperSlide key={img}>
              <div className={styles.thumb_item}>
                <img
                  src={getImageUrl(img)}
                  alt={`Thumb`}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.main_container}>
        <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={5}
          observer={true}
          observeParents={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Thumbs, Autoplay]}
          speed={1200}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className={styles.myMainSlider}
        >
          {images.map((img) => (
            <SwiperSlide key={img}>
              <img
                src={getImageUrl(img)}
                alt="Product view"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
