import { useState, useEffect, useRef, useMemo } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './DeliverySelector.module.scss';
import { Typewriter } from 'react-simple-typewriter';
import { Icon } from '@/components/ui/Icon/Icon';

const API_KEY = import.meta.env.VITE_NOVA_POST_KEY || '';
const API_URL =
  import.meta.env.VITE_NOVA_POST_URL || 'https://api.novaposhta.ua/v2.0/json/';

const oblastCenters = [
  'Київ',
  'Харків',
  'Одеса',
  'Дніпро',
  'Донецьк',
  'Запоріжжя',
  'Львів',
  'Кривий Ріг',
  'Миколаїв',
  'Вінниця',
  'Херсон',
  'Полтава',
  'Чернігів',
  'Mate Academy',
  'Черкаси',
  'Житомир',
  'Суми',
  'Рівне',
  'Івано-Франківськ',
  'Тернопіль',
  'Луцьк',
  'Ужгород',
  'Хмельницький',
  'Кропивницький',
  'Сімферополь',
];

interface City {
  Ref: string;
  Description: string;
  AreaDescription: string;
}

interface Warehouse {
  Ref: string;
  Description: string;
}

const cache: Record<string, City[] | Warehouse[]> = {};

interface DeliverySelectorProps {
  onChange?: (city: City | null, warehouse: Warehouse | null) => void;
}

export const DeliverySelector = ({ onChange }: DeliverySelectorProps) => {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState<City | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [warehouseSearch, setWarehouseSearch] = useState('');

  const hasMountedCities = useMountTransition(cities.length > 0, 300);

  const warehouseRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const isHintVisible = search.length === 0;

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (onChange && city && selectedWarehouse) {
      onChange(city, selectedWarehouse);
    }
  }, [city, selectedWarehouse, onChange]);

  useEffect(() => {
    if (city && debouncedSearch === city.Description) return;

    if (debouncedSearch.length < 3) {
      setCities([]);
      return;
    }

    const key = debouncedSearch.toLowerCase();

    if (cache[key]) {
      setCities(cache[key] as City[]);
      setActiveIndex(0);
      return;
    }

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    fetch(API_URL, {
      method: 'POST',
      signal: controllerRef.current.signal,
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: 'Address',
        calledMethod: 'getCities',
        methodProperties: { FindByString: debouncedSearch, Limit: '10' },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          cache[key] = data.data;
          setCities(data.data);
          setActiveIndex(0);
        }
      })
      .catch((e) => {
        if (e.name !== 'AbortError') console.error(e);
      });
  }, [debouncedSearch, city]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!warehouseRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectCity = async (c: City) => {
    setCity(c);
    setSelectedWarehouse(null);
    setSearch(c.Description);
    setCities([]);
    setLoading(true);
    setVisibleCount(10);
    setWarehouseSearch('');

    const key = 'w-' + c.Ref;

    if (cache[key]) {
      setWarehouses(cache[key] as Warehouse[]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: { CityRef: c.Ref },
        }),
      });

      const data = await res.json();

      if (data.success) {
        cache[key] = data.data;
        setWarehouses(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!cities.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % cities.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + cities.length) % cities.length);
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      selectCity(cities[activeIndex]);
    }
  };

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter((w) =>
      w.Description.toLowerCase().includes(warehouseSearch.toLowerCase()),
    );
  }, [warehouses, warehouseSearch]);

  const hasMountedWarehouses = useMountTransition(
    dropdownOpen && filteredWarehouses.length > 0,
    300,
  );

  const visibleWarehouses = useMemo(
    () => filteredWarehouses.slice(0, visibleCount),
    [filteredWarehouses, visibleCount],
  );

  return (
    <div className={styles.container}>
      <Typography variant="h3">checkout.deliveryTitle</Typography>
      <div className={styles.field}>
        <div className={styles.inputWrapper}>
          <input
            autoFocus
            onBlur={() => setTimeout(() => setCities([]), 150)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
            placeholder=""
            onKeyDown={handleCityKeyDown}
          />

          {isHintVisible && (
            <div className={styles.hintOverlay}>
              <Typewriter
                words={oblastCenters}
                loop={0}
                cursor
                typeSpeed={150}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>
          )}

          {hasMountedCities && (
            <ul
              className={`${styles.dropdown} ${cities.length > 0 ? styles.in : styles.out}`}
            >
              {cities.map((c, i) => (
                <li
                  key={c.Ref}
                  data-active={i === activeIndex}
                  className={styles.dropdownItem}
                  onClick={() => selectCity(c)}
                >
                  {c.Description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        className={styles.comboWrapper}
        ref={warehouseRef}
      >
        <div className={styles.comboInputWrapper}>
          <input
            className={styles.comboInput}
            placeholder={
              city ?
                'Введи номер або адресу відділення'
              : 'Спочатку оберіть місто'
            }
            value={warehouseSearch}
            disabled={!city || loading}
            onChange={(e) => {
              setWarehouseSearch(e.target.value);
              setVisibleCount(20);
            }}
            onFocus={() => setDropdownOpen(true)}
          />

          <Icon
            name="CHEVRON_DOWN"
            className={styles.chevron}
          />
        </div>

        {hasMountedWarehouses && (
          <ul
            className={`${styles.comboDropdown} ${dropdownOpen && filteredWarehouses.length > 0 ? styles.in : styles.out}`}
          >
            {visibleWarehouses.map((w) => (
              <li
                key={w.Ref}
                className={styles.comboItem}
                onClick={() => {
                  setSelectedWarehouse(w);
                  setWarehouseSearch(w.Description);
                  setDropdownOpen(false);
                }}
              >
                {w.Description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

function useDebounce<T>(value: T, delay: number) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setState(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return state;
}

function useMountTransition(isMounted: boolean, unmountDelay: number) {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isMounted && !hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(true), 0);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }

    return () => clearTimeout(timeoutId);
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
}
