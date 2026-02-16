import { Route, Routes } from 'react-router';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';

function App() {
  return (
    <>
      <h1>Team 5 project</h1>
      <h2>All css reset by _reset.scss</h2>
      <Select>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">1</SelectItem>
            <SelectItem value="dark">2</SelectItem>
            <SelectItem value="system">3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ICON_MAP.HOME />
      <ICON_MAP.CART />
      <ICON_MAP.CHEVRON_DOWN />
      <BadgeIcon
        name="CART"
        count={1}
      />
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
