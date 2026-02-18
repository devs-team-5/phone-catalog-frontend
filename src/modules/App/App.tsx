import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../Core/NotFoundPage';

import { Footer } from '@/components/common/Footer/Footer';
import { Header } from '@/components/common/Header';
import styles from './App.module.scss';
import { Test } from '../Test';
import { HomePage } from '../HomePage/HomePage';
import { CatalogPage } from '../CatalogPage';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>

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
              element={<h1>Phones</h1>}
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
              element={<h1>Tablets</h1>}
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
              element={<h1>Accessories</h1>}
            />
          </Route>

          <Route
            path="/test"
            element={<Test />}
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
