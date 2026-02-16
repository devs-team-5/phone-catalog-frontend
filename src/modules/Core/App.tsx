import { Route, Routes } from 'react-router';
function App() {
  return (
    <>
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
