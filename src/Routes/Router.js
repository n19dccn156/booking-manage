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
import AuthorizationComponent from '../Components/CoreComponent/AuthorizationComponent';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          {/* buoc nay dung de xac thuc */}
          <Route element={<AuthorizationComponent/>}>
            <Route path='/' element={<DashBoardPage/>}/>
            <Route path='/hotel' element={<HotelPage/>}/>
            <Route path='/room' element={<RoomPage/>}/>
            <Route path='/statistic' element={<StatisticPage/>}/>
            <Route path='/order/await' element={<OrderAwaitPage/>}/>
            <Route path='/order/comfirm' element={<OrderComfirmPage/>}/>
            <Route path='/order/ongoing' element={<OrderOngoingPage/>}/>
            <Route path='/order/complete' element={<OrderCompletePage/>}/>
            <Route path='/order/cancel' element={<OrderCancelPage/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;