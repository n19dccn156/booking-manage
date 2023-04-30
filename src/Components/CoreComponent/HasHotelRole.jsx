// import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Constants from "../../Constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { AdminAction, EmployeeAction, HotelAction } from "../../Actions/LoginAction";

const HasHotelRole = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const access_token = localStorage.getItem('authorization')
  const navigate = useNavigate();

  if(loggedIn === Constants.ADMIN) {
    // navigate('/admin')
    return <Navigate to='/admin'/>
  } else if(loggedIn === Constants.EMPLOYEE) {
    // navigate('/employee')
    return <Navigate to='/employee'/>
  } else if(loggedIn === Constants.CUSTOMER) {
    // navigate('/employee')
    return <Navigate to='/home'/>
  } else if(loggedIn === Constants.HOTEL) {
    return <Outlet/>
  } else if (access_token !== null && access_token.startsWith("Bearer ")) {
    axios({
      method: "GET",
      url: Constants.host + Constants.URL_AUTHOZ,
      headers: { Authorization: access_token }
    })
    .then((res) => {
      if (res.data.data === 'ADMIN') {
        // console.log('ADMIN')
        dispatch(AdminAction())
      } if (res.data.data === 'EMPLOYEE') {
        // console.log('Call api is EMPLOYEE')
        dispatch(EmployeeAction())
      } if (res.data.data === 'HOTEL') {
        // console.log('HOTEL')
        dispatch(HotelAction())
      } if (res.data.data === 'CUSTOMER') {
        navigate('/home')
      } else {
        return <Navigate to='/login'/>
      }
    })
    .catch((err) => {
      message.error(err.response.data.message)
      navigate('/login');
      return;
      // return <Navigate to='/login'/>   
    })
  } else {
    return <Navigate to='/login'/>
  }
  
}

export default HasHotelRole;