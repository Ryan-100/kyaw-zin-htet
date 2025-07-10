
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import RocketScrollButton from './components/shared/RocketScrollButton';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
        <RocketScrollButton/>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
