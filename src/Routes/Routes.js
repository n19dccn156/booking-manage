import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import StatisticPage from '../Pages/Tab/StatisticPage';
import RoomPage from '../Pages/Tab/RoomPage';
import HotelPage from '../Pages/Tab/HotelPage';
import DashBoardPage from '../Pages/Tab/DashboardPage';
import OrderAwaitPage from '../Pages/Tab/Order/OrderAwaitPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          {/* buoc nay dung de xac thuc */}
          <Route>
            <Route path='/' element={<DashBoardPage/>}/>
            <Route path='hotel' element={<HotelPage/>}/>
            <Route path='room' element={<RoomPage/>}/>
            <Route path='statistic' element={<StatisticPage/>}/>
            <Route path='order/await' element={<OrderAwaitPage/>}/>
            {/* <Route>
              <Route exact path='/order/await' element={<AwaitContainer/>}/>
              <Route exact path='/order/comfirm' element={<ComfirmContainer/>}/>
              <Route exact path='/order/ongoing' element={<OngoingContainer/>}/>
              <Route exact path='/order/complete' element={<CompleteContainer/>}/>
              <Route exact path='/order/cancel' element={<CancelContainer/>}/>
            </Route> */}
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;