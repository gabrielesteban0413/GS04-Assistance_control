import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Estilos base
import './assets/styles/generic/_reset.css';
import './assets/styles/elements/_base.css';

// Estilos de páginas (carpeta 'pages', no '7-pages')
import './assets/styles/pages/_login.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);