import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './NotFoundPage';

import { Footer } from '@/components/common/Footer/Footer';
import { Header } from '@/components/common/Header';
import { Typography } from '@/components/ui/Typography/Typography';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
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
