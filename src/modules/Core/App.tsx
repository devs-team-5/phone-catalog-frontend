import { Route, Routes } from 'react-router';

import { ICON_MAP } from '@/components/ui/Icon/icons';
import { BadgeIcon } from '@/components/ui/BageIcon/BageIcon';
import { Typography } from '@/components/ui/Typography/Typography';

function App() {
  return (
    <>
      <Typography variant="body">
        Apple iPhone Xs 64GB Silver (iMT9G2FS/A)999
      </Typography>
      <Typography
        variant="uppercase"
        color="red"
      >
        Team 5 project999
      </Typography>
      <Typography variant="h2">All css reset by _reset.scss999</Typography>
      <p>asfdasfas</p>
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
