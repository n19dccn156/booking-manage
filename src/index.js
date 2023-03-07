import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardPage from './Pages/Tab/DashboardPage';
import Routes from './Routes/Routes';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

// const stores = configureStore({reducer: Reducers})

root.render(
  <Routes/>
  // <BrowserRouter>
  //  <App />
  // </BrowserRouter>
);