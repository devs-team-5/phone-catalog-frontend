import styles from './ProductDetalisPage.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { useEffect, useState } from 'react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { RecommendedProducts } from './components/RecommendedProducts';
import { Button } from '@/components/ui/Button';
import { useParams } from 'react-router-dom';
import { getImageUrl, getProductDetails } from '@/api/products';
import type { Categories } from '@/types/Categories';
import type { ProductDetails } from '@/types/ProductDetails';
import { useFavourites } from '@/context/FavouritesContext';

type Props = {
  category: Categories;
};

export const ProductDetailsPage: React.FC<Props> = ({ category }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const { isFavourite, toggleFavourite } = useFavourites();

  useEffect(() => {
    if (!slug) {
      return;
    }

    getProductDetails(category, slug).then(setProduct);
  }, []);

  if (!product) {
    return null;
  }

  const {
    namespaceId,
    name,
    images,
    capacityAvailable,
    camera,
    cell,
    capacity,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    zoom,
    description,
    ram,
  } = product;
  const isFav = isFavourite(namespaceId);

  return (
    <>
      <Breadcrumbs />
      <div className={styles.container}>
        <Typography
          variant="h2"
          className={styles.mainTitle}
        >
          {name}
        </Typography>

        <div className={styles.product_gallery_wrapper}>
          <div className={styles.thumbs_container}>
            <Swiper
              onSwiper={setThumbsSwiper}
              direction="horizontal"
              spaceBetween={8}
              slidesPerView={5}
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
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.thumb_item}>
                    <img
                      src={getImageUrl(img)}
                      alt={`Thumb ${index}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.main_container}>
            <Swiper
              spaceBetween={10}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Thumbs]}
              className={styles.myMainSlider}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={getImageUrl(img)}
                    alt="Product view"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.action}>
          <article className={styles.colors_title}>
            <Typography
              variant="body"
              color="secondary"
            >
              Available colors
            </Typography>
            <Typography
              variant="body"
              color="secondary"
            >
              ID: 802390
            </Typography>
          </article>

          <article className={styles.colors}>
            <Button
              shape="circle"
              baseColor="SAND"
            />
            <Button
              shape="circle"
              baseColor="GREY"
            />
            <Button
              shape="circle"
              baseColor="DARK"
            />
            <Button
              shape="circle"
              baseColor="LIGHT"
            />
          </article>
          <hr className={styles.line} />

          <article>
            <Typography
              variant="body"
              color="secondary"
            >
              Select capacity
            </Typography>
            <div className={styles.capacity}>
              {capacityAvailable.map((capacity) => (
                <div
                  className={styles.value}
                  key={capacity}
                >
                  <Typography
                    variant="body"
                    color="primary"
                  >
                    {capacity}
                  </Typography>
                </div>
              ))}
            </div>
          </article>

          <hr className={styles.line} />

          <section className={styles.price}>
            <Typography
              variant="h2"
              color="primary"
            >
              {priceDiscount}
            </Typography>
            <Typography
              variant="h2"
              color="secondary"
              className="text-decoration: line-through"
            >
              {priceRegular}
            </Typography>
          </section>

          <section className={styles.buttons}>
            <div className={styles.addToCart}>Add to cart</div>
            <Button
              size="48"
              onClick={() => toggleFavourite(namespaceId)}
            >
              {isFav ?
                <ICON_MAP.WISHLIST_RED />
              : <ICON_MAP.WISHLIST />}
            </Button>
          </section>

          <section className={styles.info}>
            <article className={styles.tech}>
              <Typography
                variant="body"
                color="secondary"
              >
                Screen
              </Typography>
              <Typography variant="body">{screen}</Typography>
            </article>

            <article className={styles.tech}>
              <Typography
                variant="body"
                color="secondary"
              >
                Resolution
              </Typography>
              <Typography variant="body">{resolution}</Typography>
            </article>

            <article className={styles.tech}>
              <Typography
                variant="body"
                color="secondary"
              >
                Processor
              </Typography>
              <Typography variant="body">{processor}</Typography>
            </article>

            <article className={styles.tech}>
              <Typography
                variant="body"
                color="secondary"
              >
                RAM
              </Typography>
              <Typography variant="body">{ram}</Typography>
            </article>
          </section>
        </div>

        <section className={styles.about}>
          <Typography
            variant="h3"
            className={styles.title}
          >
            About
          </Typography>
          <hr className={styles.line} />
          {description.map((desc) => {
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

          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Screen
            </Typography>
            <Typography variant="body">{screen}</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Resolution
            </Typography>
            <Typography variant="body">{resolution}</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Processor
            </Typography>
            <Typography variant="body">{processor}</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              RAM
            </Typography>
            <Typography variant="body">{ram}</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Built in memory
            </Typography>
            <Typography variant="body">{capacity}</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Camera
            </Typography>
            <Typography variant="body">{camera}</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Zoom
            </Typography>
            <Typography variant="body">{zoom}</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Cell
            </Typography>
            <Typography variant="body">{cell.join(', ')}</Typography>
          </article>
        </section>
        <div className={styles.slider}>
          <RecommendedProducts />
        </div>
      </div>
    </>
  );
};
