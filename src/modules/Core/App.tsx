import { Navigate, Route, Routes } from 'react-router';
import { PageNotFound } from './NotFoundPage';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route
            path="/"
            element={<h1>Home Page</h1>}
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
    </>
  );
}

export default App;
