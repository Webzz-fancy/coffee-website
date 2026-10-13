import React from 'react';
import { createRoot } from 'react-dom/client';
import './orders.css';
import Orders from './Orders';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><Orders /></React.StrictMode>
);
