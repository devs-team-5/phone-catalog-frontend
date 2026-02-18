import styles from './ProductDetalisPage.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState } from 'react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { RecommendedProducts } from './components/RecommendedProducts';

const images = [
  'src/modules/App/ProductDetalisPage/img.png',
  'src/modules/App/ProductDetalisPage/img.png',
  'src/modules/App/ProductDetalisPage/img.png',
  'src/modules/App/ProductDetalisPage/img.png',
  'src/modules/App/ProductDetalisPage/img.png',
  'src/modules/App/ProductDetalisPage/img.png',
  'src/modules/App/ProductDetalisPage/img.png',
];

export const ProductDetailsPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <>
      <Breadcrumbs />
      <div className={styles.container}>
        <Typography
          variant="h2"
          className={styles.mainTitle}
        >
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
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
                      src={img}
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
                    src={'src/modules/App/ProductDetalisPage/img.png'}
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
            <div className={styles.gray}></div>
            <div className={styles.gray}></div>
            <div className={styles.gray}></div>
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
              <div className={styles.value}>
                <Typography
                  variant="body"
                  color="white"
                >
                  64 GB
                </Typography>
              </div>
              <div className={styles.value}>
                <Typography
                  variant="body"
                  color="white"
                >
                  256 GB
                </Typography>
              </div>
              <div className={styles.value}>
                <Typography
                  variant="body"
                  color="white"
                >
                  512 GB
                </Typography>
              </div>
            </div>
          </article>

          <hr className={styles.line} />

          <section className={styles.price}>
            <Typography
              variant="h2"
              color="primary"
            >
              $799
            </Typography>
            <Typography
              variant="h2"
              color="secondary"
              className="text-decoration: line-through"
            >
              $1199
            </Typography>
          </section>

          <section className={styles.buttons}>
            <div className={styles.addToCart}>Add to cart</div>
            <div className={styles.wishlist}>
              <ICON_MAP.WISHLIST />{' '}
            </div>
          </section>

          <section className={styles.info}>
            <article className={styles.tech}>
              <Typography
                variant="body"
                color="secondary"
              >
                Screen
              </Typography>
              <Typography variant="body">6.5” OLED</Typography>
            </article>

            <article className={styles.tech}>
              <Typography
                variant="body"
                color="secondary"
              >
                Resolution
              </Typography>
              <Typography variant="body">2688x1242</Typography>
            </article>

            <article className={styles.tech}>
              <Typography
                variant="body"
                color="secondary"
              >
                Processor
              </Typography>
              <Typography variant="body">Apple A12 Bionic</Typography>
            </article>

            <article className={styles.tech}>
              <Typography
                variant="body"
                color="secondary"
              >
                RAM
              </Typography>
              <Typography variant="body">3 GB</Typography>
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
          <article className={styles.article}>
            <Typography
              variant="h4"
              className={styles.title}
            >
              And then there was Pro
            </Typography>
            <Typography
              variant="body"
              color="secondary"
            >
              A transformative triple‑camera system that adds tons of capability
              without complexity.
              <br />
              <br />
              An unprecedented leap in battery life. And a mind‑blowing chip
              that doubles down on machine learning and pushes the boundaries of
              what a smartphone can do. Welcome to the first iPhone powerful
              enough to be called Pro.
            </Typography>
          </article>

          <article className={styles.article}>
            <Typography
              variant="h4"
              className={styles.title}
            >
              Camera
            </Typography>
            <Typography
              variant="body"
              color="secondary"
            >
              Meet the first triple‑camera system to combine cutting‑edge
              technology with the legendary simplicity of iPhone. Capture up to
              four times more scene. Get beautiful images in drastically lower
              light. Shoot the highest‑quality video in a smartphone — then edit
              with the same tools you love for photos. You’ve never shot with
              anything like it.
            </Typography>
          </article>

          <article className={styles.article}>
            <Typography
              variant="h4"
              className={styles.title}
            >
              Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
              Love it.
            </Typography>
            <Typography
              variant="body"
              color="secondary"
            >
              iPhone 11 Pro lets you capture videos that are beautifully true to
              life, with greater detail and smoother motion. Epic processing
              power means it can shoot 4K video with extended dynamic range and
              cinematic video stabilization — all at 60 fps. You get more
              creative control, too, with four times more scene and powerful new
              editing tools to play with.
            </Typography>
          </article>
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
            <Typography variant="body">6.5” OLED</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Resolution
            </Typography>
            <Typography variant="body">2688x1242</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Processor
            </Typography>
            <Typography variant="body">Apple A12 Bionic</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              RAM
            </Typography>
            <Typography variant="body">3 GB</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              RAM
            </Typography>
            <Typography variant="body">64 GB</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Camera
            </Typography>
            <Typography variant="body">
              12 Mp + 12 Mp + 12 Mp (Triple)
            </Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Zoom
            </Typography>
            <Typography variant="body">Optical, 2x</Typography>
          </article>
          <article className={styles.tech}>
            <Typography
              variant="body"
              color="secondary"
            >
              Cell
            </Typography>
            <Typography variant="body">GSM, LTE, UMTS</Typography>
          </article>
        </section>
        <div className={styles.slider}>
          <RecommendedProducts />
        </div>
      </div>
    </>
  );
};
