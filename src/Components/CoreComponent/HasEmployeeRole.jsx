// import { useEffect } from "react";
// import axios from "axios";
import axios from "axios";
import { message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Constants from "../../Constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { AdminAction, EmployeeAction, HotelAction } from "../../Actions/LoginAction";

const HasEmployeeRole = () => {
  
  const loggedIn = useSelector((state) => state.loggedIn)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const access_token = localStorage.getItem('authorization')

  if(loggedIn === Constants.ADMIN) {
    navigate('/admin')
  } else if(loggedIn === Constants.EMPLOYEE) {
    return <Outlet/>
  }  else if(loggedIn === Constants.HOTEL) {
    navigate('/')
  } else if (access_token !== null && access_token.startsWith("Bearer")) {
    axios({
      method: "POST",
      url: Constants.host + Constants.URL_AUTHOZ,
      headers: { Authorization: access_token }
    })
    .then((res) => {
      if (res.data.data === 'ADMIN') {
        console.log('ADMIN')
        dispatch(AdminAction())
        // return <Outlet/>
      } if (res.data.data === 'EMPLOYEE') {
        console.log('EMPLOYEE')
        // navigate('/employee', {replace : true})
        dispatch(EmployeeAction())
      } if (res.data.data === 'HOTEL') {
        console.log('HOTEL')
        // navigate('/hotel', {replace : true})
        dispatch(HotelAction())
      } else {
        navigate('/login')
        return;
      }
    })
    .catch((err) => {
      message.error(err.data.data.message)
      navigate('/login')
      return;
    })
  } else {
    navigate('/login')
    return;
  }
}

export default HasEmployeeRole;