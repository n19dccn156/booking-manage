import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardPage from './Pages/Tab/DashboardPage';
import App from './Pages/App';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

// const stores = configureStore({reducer: Reducers})

root.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>
);