/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@/components/ui/Typography/Typography';
import type { Categories } from '@/types/Categories';
import type React from 'react';
import styles from './CatalogPage.module.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsWithParams } from '@/api/products';
import { ProductsList } from '@/components/common/ProductsList/ProductsList';
import { Pagination } from './components/Pagination/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/Select';
import type { Product } from '@/types/Product';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

type Props = {
  category: Categories;
  title: string;
};

export const CatalogPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = searchParams.get('perPage') || '16';

  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const { products, totalCount } = await getProductsWithParams({
        category: category,
        sort: sort,
        page: page,
        perPage: perPage,
      });

      setProducts(products);
      setTotalCount(totalCount);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [category, sort, page, perPage]);

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === null || (key === 'page' && value === '1')) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    if (key !== 'page') {
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };
  return (
    <>
      <Breadcrumbs />
      <Typography
        variant="h1"
        className={styles.title}
      >
        {title}
      </Typography>
      {isLoading ?
        <Skeleton className={`${styles['count--skeleton']} ${styles.count}`} />
      : <Typography
          variant="body"
          color="secondary"
          className={styles.count}
        >
          {totalCount} models
        </Typography>
      }

      <div className={styles.filters}>
        <div className={styles.filters__item}>
          <Typography
            variant="small"
            color="secondary"
          >
            Sort by
          </Typography>
          <Select
            value={sort}
            onValueChange={(value) => updateSearchParams('sort', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="age">Newest</SelectItem>
              <SelectItem value="title">Alphabetically</SelectItem>
              <SelectItem value="cheapest">Price: Low to High</SelectItem>
              <SelectItem value="expensive">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={styles.filters__item}>
          <Typography
            variant="small"
            color="secondary"
          >
            Items on page
          </Typography>
          <Select
            value={perPage}
            onValueChange={(value) => updateSearchParams('perPage', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {!isLoading && isError && (
        <div className={styles.error}>
          <Typography
            variant="body"
            color="secondary"
          >
            Something went wrong
          </Typography>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <Typography
          variant="body"
          color="secondary"
          className={styles.noResults}
        >
          There are no {category} yet
        </Typography>
      )}

      {(isLoading || products.length > 0) && !isError && (
        <>
          <ProductsList
            products={products}
            isLoading={isLoading}
          />

          {!isLoading && perPage !== 'all' && totalCount > Number(perPage) && (
            <div className={styles.pagination}>
              <Pagination
                total={totalCount}
                perPage={Number(perPage)}
                currentPage={page}
                onPageChange={(p) => updateSearchParams('page', p.toString())}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
