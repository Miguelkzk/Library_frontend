import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AppStateProvider } from './components/AppStateContext.jsx';
import { ThemeProvider } from './ThemeContext';


const root = document.getElementById('root');

// Utiliza createRoot solo para la primera renderización
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <ThemeProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
