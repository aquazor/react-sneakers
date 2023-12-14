import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider, SneakersProvider } from './context';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <CartProvider>
    <SneakersProvider>
      <App />
    </SneakersProvider>
  </CartProvider>
);
