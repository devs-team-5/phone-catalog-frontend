import { Header } from '@/components/common/Header/Header';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<h1>Team 5</h1>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
