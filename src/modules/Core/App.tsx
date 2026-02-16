import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './NotFoundPage';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/Select';

function App() {
  return (
    <>
      <Select defaultValue="newest">
        <SelectTrigger>
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="alphabetically">Alphabetically</SelectItem>
          <SelectItem value="cheapest">Cheapest</SelectItem>
        </SelectContent>
      </Select>

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
