import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import styles from './SearchInput.module.scss';
import { SearchItem } from './components/SearchItem';
import type { Product } from '@/types/Product';
import { getProductsByQuery } from '@/api/products';
import { useNavigate } from 'react-router-dom';
import { SearchItemSkeleton } from './components/SearchItem/SearchItemSkeleton';
import { useTranslation } from 'react-i18next';

export function SearchInput() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [debouncedQuery] = useDebounce(query, 500);
  const navigate = useNavigate();
  const isLoading = query.length > 0 && query !== debouncedQuery;
  const { t } = useTranslation<'translation'>();
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return;
    }

    getProductsByQuery(debouncedQuery).then(setProducts);
  }, [debouncedQuery]);

  return (
    <Combobox
      value={selectedProduct}
      onChange={(product: Product | null) => {
        if (!product) return;
        setSelectedProduct(product);
        navigate(`/${product?.category}/${product?.itemId}`);
      }}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(product: Product) => product?.name ?? query}
        className={styles.container}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('filters.search')}
      />
      <ComboboxOptions
        anchor="bottom"
        className={styles.item_container}
      >
        {isLoading ?
          <SearchItemSkeleton />
        : products.map((product) => (
            <ComboboxOption
              key={product.id}
              value={product}
            >
              <SearchItem product={product} />
            </ComboboxOption>
          ))
        }
      </ComboboxOptions>
    </Combobox>
  );
}
