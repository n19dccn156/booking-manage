import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Reducers from './Reducers/Reducers';
import Router from './Routes/Router';
const root = ReactDOM.createRoot(document.getElementById('root'));

const stores = configureStore({ reducer: Reducers })

root.render(
  <Provider store={stores}>
    <Router />
  </Provider>
);