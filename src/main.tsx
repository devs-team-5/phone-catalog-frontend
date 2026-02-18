import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import '@/styles/main.scss';
import './styles/tailwind.css';
import App from './modules/App/App.tsx';

import { FavouritesProvider } from '@/context/FavouritesContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavouritesProvider>
      <Router>
        <App />
      </Router>
    </FavouritesProvider>
  </StrictMode>,
);
