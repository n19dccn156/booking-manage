import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import StatisticPage from '../Pages/Tab/StatisticPage';
import RoomPage from '../Pages/Tab/RoomPage';
import HotelPage from '../Pages/Tab/HotelPage';
import DashBoardPage from '../Pages/Tab/DashboardPage';
import OrderAwaitPage from '../Pages/Tab/Order/OrderAwaitPage';
import OrderComfirmPage from '../Pages/Tab/Order/OrderComfirmPage';
import OrderOngoingPage from '../Pages/Tab/Order/OrderOngoingPage';
import OrderCompletePage from '../Pages/Tab/Order/OrderCompletePage';
import OrderCancelPage from '../Pages/Tab/Order/OrderCancelPage';
import HasEmployeeRole from '../Components/CoreComponent/HasEmployeeRole';
import HasHotelRole from '../Components/CoreComponent/HasHotelRole';
import HasAdminRole from '../Components/CoreComponent/HasAdminRole';
import Employee from '../Pages/Employee/Employee';
import Admin from '../Pages/Admin/Admin';
import NotfoundPage from '../Pages/Error/NotFoundPage';
import LogoutPage from '../Pages/LogoutPage';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        {/* Hotel role */}
        <Route path='/' element={<HasHotelRole />}>
          <Route path='/' element={<DashBoardPage />} index/>
          <Route path='/hotel' element={<HotelPage />} />
          <Route path='/room' element={<RoomPage />} />
          <Route path='/statistic' element={<StatisticPage />} />
          <Route path='/order/await' element={<OrderAwaitPage />} />
          <Route path='/order/comfirm' element={<OrderComfirmPage />} />
          <Route path='/order/ongoing' element={<OrderOngoingPage />} />
          <Route path='/order/complete' element={<OrderCompletePage />} />
          <Route path='/order/cancel' element={<OrderCancelPage />} />
        </Route>
        {/* employee role */}
        <Route path='/employee' element={<HasEmployeeRole/>}>
          <Route path='/employee' element={<Employee />} index/>
        </Route>
        {/* Admin role */}
        <Route path='/admin' element={<HasAdminRole/>}>
          <Route path='/admin' element={<Admin />} index/>
        </Route>

        <Route path='/logout' element={<LogoutPage />} />
        <Route path='*' element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;