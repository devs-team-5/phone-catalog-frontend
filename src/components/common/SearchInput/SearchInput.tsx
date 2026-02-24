import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import styles from './SearchInput.module.scss';
import { SearchItem } from './components/SearchItem';
import type { Product } from '@/types/Product';
import { getProductsByQuery } from '@/api/products';
import { useNavigate } from 'react-router-dom';
import { SearchItemSkeleton } from './components/SearchItem/SearchItemSkeleton';
import { useTranslation } from 'react-i18next';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { Typography } from '@/components/ui/Typography/Typography';

export function SearchInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [debouncedQuery] = useDebounce(query, 500);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = query.length > 0 && query !== debouncedQuery;
  const { t } = useTranslation<'translation'>();
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return;
    }

    getProductsByQuery(debouncedQuery).then(setProducts);
  }, [debouncedQuery]);

  const handleSelectProduct = (product: Product | null) => {
    if (!product) return;
    navigate(`/${product?.category}/${product?.itemId}`);
    setQuery('');
    setSelectedProduct(null);
    setIsExpanded(false);
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const closeSearch = () => {
    setIsExpanded(false);
    setQuery('');
  };

  return (
    <div className={styles.wrapper}>
      {!isExpanded && (
        <button
          onClick={toggleSearch}
          className={styles.search_trigger}
        >
          <ICON_MAP.SEARCH size={20} />
        </button>
      )}

      <Combobox
        value={selectedProduct}
        onChange={handleSelectProduct}
        onClose={closeSearch}
      >
        <div
          className={`${styles.search_overlay} ${isExpanded ? styles.active : ''}`}
        >
          <ComboboxInput
            ref={inputRef}
            displayValue={(product: Product) => product?.name ?? query}
            className={styles.input_field}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('filters.search')}
          />

          <button
            onClick={() => setIsExpanded(false)}
            className={styles.close_btn}
          >
            <ICON_MAP.CLOSE />
          </button>

          <ComboboxOptions
            anchor="bottom start"
            className={styles.item_container}
          >
            {isLoading ?
              <>
                <SearchItemSkeleton />
                <SearchItemSkeleton />
                <SearchItemSkeleton />
              </>
            : products.length ?
              products.map((product) => (
                <ComboboxOption
                  key={product.id}
                  value={product}
                >
                  <SearchItem product={product} />
                </ComboboxOption>
              ))
            : <div className={styles.error}>
                <Typography variant="h4">Nothig Found</Typography>
              </div>
            }
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
