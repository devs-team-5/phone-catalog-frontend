import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import '@/styles/main.scss';
import './styles/_theme.scss';
import './styles/tailwind.css';
import App from './modules/App/App.tsx';
import './i18n/i18n';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </StrictMode>,
);
