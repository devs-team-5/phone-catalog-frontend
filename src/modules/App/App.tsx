import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../Core/NotFoundPage';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

import { Footer } from '@/components/common/Footer/Footer';
import { Header } from '@/components/common/Header';

import styles from './App.module.scss';
import { Test } from '../Test';
import { HomePage } from '../HomePage/HomePage';
import { CatalogPage } from '../CatalogPage';
import { FavouritesPage } from '../FavouritesPage/FavouritesPage';
import { CartPage } from '../CartPage/CartPage';
import { ProductDetailsPage } from '../ProductDetalisPage';
import { LoginPage } from '../Auth/LoginPage';
import { ProfilePage } from '../ProfilePage/ProfilePage';
import { useEffect } from 'react';
import { useThemeStore } from '../../hooks/ThemeStore';
import { ContactsPage } from '../ContactsPage/ContactsPage';
import { ToastContainer } from '@/components/Toast';
import { SupportChat } from '@/components/SupportChat/SupportChat';

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

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
                  title="welcome.mobilePhone"
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
                  title="welcome.tablets"
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
                  title="welcome.accessories"
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
            path="/login"
            element={<LoginPage />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={<ProfilePage />}
            />
          </Route>

          <Route>
            <Route
              path="/favourites"
              element={<FavouritesPage />}
            />
            <Route
              path="/cart"
              element={<CartPage />}
            />
          </Route>

          <Route
            path="*"
            element={<PageNotFound />}
          />

          <Route
            path="/contacts"
            element={<ContactsPage />}
          />
        </Routes>
      </main>

      <Footer />

      <SupportChat />

      <ToastContainer />
    </>
  );
}

export default App;
