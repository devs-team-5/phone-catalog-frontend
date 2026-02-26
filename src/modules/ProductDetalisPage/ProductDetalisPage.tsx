import styles from './ProductDetalisPage.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import React, { useEffect, useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { RecommendedProducts } from './components/RecommendedProducts';
import { Link, useParams } from 'react-router-dom';
import { getImageUrl, getProductDetails } from '@/api/products';
import type { Categories } from '@/types/Categories';
import type { ProductDetails } from '@/types/ProductDetails';
import { ProductActions } from './components/ProductActions';
import { ImageSlider } from './components/ImageSlider';
import { Description } from './components/Description';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { ProductDetailsSkeleton } from './components/ProductDetailsSkeleton/ProductDetailsSkeleton';
import { STATIC_IMAGES } from '@/constants/images';

type ProductDetailsPageProps = {
  category: Categories;
};

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  category,
}) => {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loadedSlug, setLoadedSlug] = useState<string | undefined>();

  useEffect(() => {
    if (!slug) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    getProductDetails(category, slug).then((data) => {
      setProduct(data);
      setLoadedSlug(slug);
    });
  }, [slug, category]);

  if (loadedSlug !== slug) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <>
        <Breadcrumbs />
        <div>
          <Typography
            variant="h2"
            color="primary"
          >
            Product not found
          </Typography>
          <Link to="/">
            <img
              src={STATIC_IMAGES.placeholders.noImage}
              alt="Empty wishlist"
              className={styles.emptyImage}
              loading="lazy"
            />
          </Link>
        </div>
      </>
    );
  }

  const {
    id,
    namespaceId,
    name,
    capacityAvailable,
    color,
    camera,
    cell,
    images,
    capacity,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    zoom,
    description,
    ram,
    colorsAvailable,
    code,
  } = product;

  const colors = [...colorsAvailable].sort((colorA, colorB) => {
    const normalizedColorA = colorA.toLowerCase().replaceAll(' ', '');
    const normalizedColorB = colorB.toLowerCase().replaceAll(' ', '');

    return normalizedColorA.localeCompare(normalizedColorB);
  });

  const mainSpecs = [
    { label: 'specs.screen', value: screen },
    { label: 'specs.resolution', value: resolution },
    { label: 'specs.processor', value: processor },
    { label: 'specs.ram', value: ram },
  ];

  const fullSpecs = [
    ...mainSpecs,
    { label: 'product.builtInMemory', value: capacity },
    { label: 'product.camera', value: camera },
    { label: 'product.zoom', value: zoom },
    { label: 'product.cell', value: cell.join(', ') },
  ];

  const getColorUrl = (newColor: string) => {
    const normilizedCapacity = capacity.toLowerCase();
    const colorForLink = newColor.replaceAll(' ', '');

    return `/${category}/${namespaceId}-${normilizedCapacity}-${colorForLink}`;
  };

  const getCapacityUrl = (newCapacity: string) => {
    const normilizedCapacity =
      newCapacity ? newCapacity.toLowerCase() : capacity.toLowerCase();

    return `/${category}/${namespaceId}-${normilizedCapacity}-${color.replaceAll(' ', '-')}`;
  };

  return (
    <>
      <Breadcrumbs />
      <div className={styles.container}>
        <BackButton />

        <Typography
          variant="h2"
          className={styles.mainTitle}
        >
          {name}
        </Typography>

        <div className={styles.slider_container}>
          <ImageSlider
            images={images}
            getImageUrl={getImageUrl}
          />
        </div>

        <ProductActions
          id={id}
          priceRegular={priceRegular}
          currentColor={color}
          colorsAvailable={colors}
          currentCapacity={capacity}
          capacityAvailable={capacityAvailable}
          priceDiscount={priceDiscount}
          mainSpecs={mainSpecs}
          code={code}
          getColorUrl={getColorUrl}
          getCapacityUrl={getCapacityUrl}
        />

        <Description
          about={description}
          specs={fullSpecs}
        />

        <div className={styles.slider}>
          <RecommendedProducts />
        </div>
      </div>
    </>
  );
};
