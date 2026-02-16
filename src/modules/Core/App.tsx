import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './NotFoundPage';
import { Button } from '@/components/ui/Button';
import { ICON_MAP } from '@/components/ui/Icon/icons';

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

      <Button
        variant="default"
        size="32"
        shape="circle"
        baseColor="GREEN"
      >
        <ICON_MAP.CHEVRON_DOWN />
      </Button>
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
