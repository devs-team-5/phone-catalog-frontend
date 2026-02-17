import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../Core/NotFoundPage';

import { Footer } from '@/components/common/Footer/Footer';
import { Header } from '@/components/common/Header';
import styles from './App.module.scss';
import { Typography } from '@/components/ui/Typography/Typography';
import { Test } from '../Test';

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
            element={<Typography variant="h1">Home Page</Typography>}
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
