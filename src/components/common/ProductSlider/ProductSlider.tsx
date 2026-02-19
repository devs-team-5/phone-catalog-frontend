import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { ProductCard } from '@/components/common/ProductCard';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './ProductSlider.module.scss';
import type { Product } from '@/types/Product';
import React, { useState } from 'react';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Button } from '@/components/ui/Button';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

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
          <button ref={setPrevEl}>
            <Button size="32">
              <ICON_MAP.CHEVRON_LEFT />
            </Button>
          </button>
          <button ref={setNextEl}>
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
        navigation={{
          prevEl,
          nextEl,
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
