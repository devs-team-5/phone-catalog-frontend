import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import '@/styles/main.scss';
import './styles/_theme.scss';
import './styles/tailwind.css';
import App from './modules/App/App.tsx';
import { ThemeProvider } from './modules/ThemeContext/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>,
);
