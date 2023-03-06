import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import StatisticPage from '../Pages/Tab/StatisticPage';
import RoomPage from '../Pages/Tab/RoomPage';
import HotelPage from '../Pages/Tab/HotelPage';
import DashBoardPage from '../Pages/DashboardPage';
import OrderAwaitPage from '../Pages/Tab/OrderPage/OrderAwaitPage';
import OrderComfirmPage from '../Pages/Tab/OrderPage/OrderComfirmPage';
import OrderOngoingPage from '../Pages/Tab/OrderPage/OrderOngoingPage';
import OrderCompletePage from '../Pages/Tab/OrderPage/OrderCompletePage';
import OrderCancelPage from '../Pages/Tab/OrderPage/OrderCancelPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/login' element={<LoginPage/>}/>

          <Route path='/' element={<DashBoardPage/>}>
            <Route exact path='hotel' element={<HotelPage/>}/>
            <Route exact path='room' element={<RoomPage/>}/>
            <Route exact path='statistic' element={<StatisticPage/>}/>
            <Route exact path='/order/await' element={<OrderAwaitPage/>}/>
            <Route exact path='/order/comfirm' element={<OrderComfirmPage/>}/>
            <Route exact path='/order/ongoing' element={<OrderOngoingPage/>}/>
            <Route exact path='/order/complete' element={<OrderCompletePage/>}/>
            <Route exact path='/order/cancel' element={<OrderCancelPage/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;