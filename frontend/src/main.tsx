import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/main.css';
import './assets/styles/layouts/_admin-layout.css';
import './assets/styles/components/_sidebar.css';

import '@fontsource-variable/geist';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
