import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeProvider from './providers/ThemeProvider'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);