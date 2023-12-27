import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');

// Utiliza createRoot solo para la primera renderización
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
