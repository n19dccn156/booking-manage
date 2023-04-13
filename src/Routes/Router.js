import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import StatisticPage from '../Pages/Hotel/StatisticPage';
// import RoomPage from '../Pages/Hotel/RoomPage';
import HotelPage from '../Pages/Hotel/HotelPage';
import DashBoardPage from '../Pages/Hotel/DashboardPage';
import OrderAwaitPage from '../Pages/Hotel/Order/OrderAwaitPage';
import OrderConfirmPage from '../Pages/Hotel/Order/OrderConfirmPage';
import OrderOngoingPage from '../Pages/Hotel/Order/OrderOngoingPage';
import OrderCompletePage from '../Pages/Hotel/Order/OrderCompletePage';
import OrderCancelPage from '../Pages/Hotel/Order/OrderCancelPage';
import HasEmployeeRole from '../Components/CoreComponent/HasEmployeeRole';
import HasHotelRole from '../Components/CoreComponent/HasHotelRole';
import HasAdminRole from '../Components/CoreComponent/HasAdminRole';
import Employee from '../Pages/Employee/Employee';
import Admin from '../Pages/Admin/Admin';
import NotfoundPage from '../Pages/Error/NotFoundPage';
import LogoutPage from '../Pages/LogoutPage';
import AccountPage from '../Pages/Public/AccountPage';


const Router = React.memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HasHotelRole />}>
            <Route path='/' element={<DashBoardPage />} />
            <Route path='/hotel' element={<HotelPage />} />
            <Route path='/statistic' element={<StatisticPage />} />
            <Route path='/order/await' element={<OrderAwaitPage />} />
            <Route path='/order/confirm' element={<OrderConfirmPage />} />
            <Route path='/order/ongoing' element={<OrderOngoingPage />} />
            <Route path='/order/complete' element={<OrderCompletePage />} />
            <Route path='/order/cancel' element={<OrderCancelPage />} />
          </Route>
          {/* employee role */}
          <Route path='/employee' element={<HasEmployeeRole />}>
            <Route path='/employee' element={<Employee />} />
          </Route>
          {/* Admin role */}
          <Route path='/admin' element={<HasAdminRole />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
        <Route path='/account' element={<AccountPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='*' element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  );
});

export default Router;