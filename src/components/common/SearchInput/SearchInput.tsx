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
import { Button } from '@/components/ui/Button';

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

  return (
    <div className={styles.wrapper}>
      {!isExpanded && (
        <Button size="64">
          <div
            onClick={toggleSearch}
            className={styles.search_trigger}
          >
            <ICON_MAP.SEARCH size={20} />
          </div>
        </Button>
      )}

      <Combobox
        value={selectedProduct}
        onChange={handleSelectProduct}
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
        </div>
      </Combobox>
    </div>
  );
}
