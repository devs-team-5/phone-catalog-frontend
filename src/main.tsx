import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import '@/styles/main.scss';
import './styles/tailwind.css';
import App from './modules/App/App.tsx';
import './i18n/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
