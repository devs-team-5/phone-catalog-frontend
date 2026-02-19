import styles from './ProductDetalisPage.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import React, { useEffect, useState } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { RecommendedProducts } from './components/RecommendedProducts';
import { useParams } from 'react-router-dom';
import { getImageUrl, getProductDetails } from '@/api/products';
import type { Categories } from '@/types/Categories';
import type { ProductDetails } from '@/types/ProductDetails';
import { ProductActions } from './components/ProductActions';
import { ImageSlider } from './components/ImageSlider';
import { Description } from './components/Description';

type ProductDetailsPageProps = {
  category: Categories;
};

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  category,
}) => {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);

  useEffect(() => {
    if (!slug) {
      return;
    }

    getProductDetails(category, slug).then(setProduct);
  }, [slug]);

  if (!product) {
    return null;
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
  } = product;

  const mainSpecs = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
  ];

  const fullSpecs = [
    ...mainSpecs,
    { label: 'Built in memory', value: capacity },
    { label: 'Camera', value: camera },
    { label: 'Zoom', value: zoom },
    { label: 'Cell', value: cell.join(', ') },
  ];

  const getColorUrl = (newColor: string) => {
    const normilizedCapacity = capacity.toLowerCase();

    return `/${category}/${namespaceId}-${normilizedCapacity}-${newColor}`;
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
        <Typography
          variant="h2"
          className={styles.mainTitle}
        >
          {name}
        </Typography>

        <ImageSlider
          images={images}
          getImageUrl={getImageUrl}
        />

        <ProductActions
          id={id}
          priceRegular={priceRegular}
          colorsAvailable={colorsAvailable}
          capacityAvailable={capacityAvailable}
          priceDiscount={priceDiscount}
          mainSpecs={mainSpecs}
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
