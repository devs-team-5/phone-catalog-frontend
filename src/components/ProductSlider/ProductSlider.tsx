import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

import { ProductCard } from '@/components/common/ProductCard';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './ProductSlider.module.scss';
import type { Product } from '@/types/Product';
import React, { useRef } from 'react';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Button } from '../ui/Button';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Typography
          variant="h2"
          className={styles.title}
        >
          {title}
        </Typography>

        <div className={styles.buttonsContainer}>
          <button ref={prevRef}>
            <Button size="32">
              <ICON_MAP.CHEVRON_LEFT />
            </Button>
          </button>
          <button ref={nextRef}>
            <Button size="32">
              <ICON_MAP.CHEVRON_RIGHT />
            </Button>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={'auto'}
        spaceBetween={16}
        slidesPerGroup={1}
        navigation={true}
        onBeforeInit={(swiper: SwiperType) => {
          if (
            typeof swiper.params.navigation !== 'boolean' &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          1200: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className={styles.swiper}
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
