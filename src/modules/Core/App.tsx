import { Route, Routes } from 'react-router';

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
            element={<h1>Team 5</h1>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
