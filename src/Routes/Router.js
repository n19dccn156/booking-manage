import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import StatisticPage from '../Pages/Hotel/StatisticPage';
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
import NotfoundPage from '../Pages/Error/NotFoundPage';
import LogoutPage from '../Pages/LogoutPage';
import AccountPage from '../Pages/Public/AccountPage';
import HomePage from '../Pages/Customer/HomePage';
import HotelDetailPage from '../Pages/Customer/HotelDetailPage';
import HotelManagePage from '../Pages/Admin/HotelManagePage';
import ConfirmOrderPage from '../Pages/Customer/ConfirmOrderPage';
import SuccessPage from '../Pages/Error/SuccessPage';
import OrderHistoryPage from '../Pages/Customer/OrderHistoryPage';


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
          <Route path='/admin' element={<HotelManagePage />} />
        </Route>
        <Route path='/confirm' element={<ConfirmOrderPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/history' element={<OrderHistoryPage />} />
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/hotels/:id' element={<HotelDetailPage/>}/>
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/success' element={<SuccessPage />} />
\        <Route path='*' element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  );
});

export default Router;