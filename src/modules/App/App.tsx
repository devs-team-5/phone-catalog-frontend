import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../Core/NotFoundPage';

import { Footer } from '@/components/common/Footer/Footer';
import { Header } from '@/components/common/Header';
import styles from './App.module.scss';
import { Test } from '../Test';
import { HomePage } from '../HomePage/HomePage';
import { CatalogPage } from '../CatalogPage';
import { FavouritesPage } from '../FavouritesPage/FavouritesPage';
import { CartPage } from '../CartPage/CartPage';
import { ProductDetailsPage } from '../ProductDetalisPage';

function App() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/home"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
          <Route path="/phones">
            <Route
              index
              element={
                <CatalogPage
                  category="phones"
                  title="Mobile phones"
                />
              }
            />
            <Route
              path=":slug"
              element={<ProductDetailsPage category="phones" />}
            />
          </Route>

          <Route path="/tablets">
            <Route
              index
              element={
                <CatalogPage
                  category="tablets"
                  title="Tablets"
                />
              }
            />
            <Route
              path=":slug"
              element={<ProductDetailsPage category="tablets" />}
            />
          </Route>

          <Route path="/accessories">
            <Route
              index
              element={
                <CatalogPage
                  category="accessories"
                  title="Accessories"
                />
              }
            />
            <Route
              path=":slug"
              element={<ProductDetailsPage category="accessories" />}
            />
          </Route>

          <Route
            path="/test"
            element={<Test />}
          />
          <Route
            path="/favourites"
            element={<FavouritesPage />}
          />
          <Route
            path="/cart"
            element={<CartPage />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
