```text
src/
├── api/                     # Взаємодія з Supabase
│   ├── products.ts          # getProducts, getProductDetails...
│   └── index.ts
│
├── assets/                  # Глобальні картинки (лого, може ще щось локальне)
│
├── components/              # ATOMS & MOLECULES (Global UI Kit)
│   ├── ui/                  # (ATOMS) Базові елементи без бізнес-логіки
│   │   ├── Button/          # Folder with index.ts, Button.tsx, Button.module.scss
│   │   ├── Icon/
│   │   ├── Input/
│   │   ├── Select/          # Radix UI wrapper
│   │   ├── Skeleton/        # Для лоадерів(на майбутнє)
│   │   └── Typography/      # Заголовки, текст
│   │
│   └── common/              # (MOLECULES) Спільні компоненти з логікою
│       ├── Breadcrumbs/     #
│       ├── Loader/          #
│       ├── Logo/
│       ├── Pagination/      #
│       └── ProductCard/     # Головна картка товару
│
├── hooks/                   # Глобальні хуки
│   ├── useDebounce.ts       # Для пошуку
│   └── useLocalStorage.ts   #
│
├── modules/                 # ORGANISMS & PAGES (Advanced Structure)
│   ├── Core/                # Глобальний Layout
│   │   ├── components/
│   │   │   ├── Header/      # Sticky header, Navigation, Search
│   │   │   ├── Footer/      # GitHub link, Back to top
│   │   │   └── BurgerMenu/
│   │   └── App.tsx          # Головний компонент з роутингом
│   │
│   ├── HomePage/            #
│   │   ├── components/
│   │   │   ├── PicturesSlider/ #
│   │   │   ├── ProductsSlider/ # Brand new / Hot prices
│   │   │   └── CategoryBlock/
│   │   └── HomePage.tsx
│   │
│   ├── CatalogPage/         # Універсальна сторінка для Phones, Tablets, Accessories
│   │   ├── components/
│   │   │   ├── CatalogFilters/ # Sort, ItemsPerPage
│   │   │   └── ProductList/
│   │   └── CatalogPage.tsx
│   │
│   ├── ProductDetailsPage/  # Сторінка товару
│   │   ├── components/
│   │   │   ├── Gallery/     # Вибір картинки
│   │   │   ├── TechSpecs/
│   │   │   └── About/
│   │   └── ProductDetailsPage.tsx
│   │
│   ├── CartPage/            # Кошик
│   │   ├── components/
│   │   │   ├── CartItem/
│   │   │   ├── CartTotal/
│   │   │   └── CheckoutModal/
│   │   └── CartPage.tsx
│   │
│   ├── FavoritesPage/       # Обране
│   │   └── FavoritesPage.tsx
│   │
│   └── NotFoundPage/        #
│
├── context/
│   ├── CartContext.tsx      # Логіка кошика + LocalStorage
│   ├── FavContext.tsx       # Логіка обраного + LocalStorage
│   └── index.ts
│
├── styles/                  # Глобальні стилі (SCSS)
│   ├── _mixins.scss         # Grid, Flex helpers, Media queries
│   ├── _variables.scss      # CSS змінні кольорів (Theme variables)
│   ├── _reset.scss
│   └── main.scss            # Імпортується в main.tsx
│
├── types/                   # TypeScript Interfaces
│   ├── Product.ts           # Product, ProductDetails
│   └── Cart.ts
│
├── utils/                   # Хелпери
│   ├── cn.ts                # classnames helper (якщо треба склеювати стилі)
│   ├── getImgUrl.ts         # Функція для Supabase Storage
│   ├── formatPrice.ts       # $ 1,200
│   └── supabaseClient.ts    # createClient
│
├── main.tsx                 # Entry point
└── vite-env.d.ts
```
