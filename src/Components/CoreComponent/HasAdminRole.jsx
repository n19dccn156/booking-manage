// import { useEffect } from "react";
// import axios from "axios";
import axios from "axios";
import { message } from "antd";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Constants from "../../Constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { AdminAction, EmployeeAction, HotelAction } from "../../Actions/LoginAction";

const HasAdminRole = () => {
  const loggedIn = useSelector((state) => state.loggedIn)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const access_token = localStorage.getItem('authorization')

  if(loggedIn === Constants.ADMIN) {
    return <Outlet/>
  } else if(loggedIn === Constants.EMPLOYEE) {
    console.log("chuyen den employee")
    navigate('/employee')
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
        // dispatch(AdminAction)
      }
    })
    .catch((err) => {
      message.error(err.data.data.message)
      return <Navigate to='/login'/>
    })
  } else {
    return <Navigate to='/login'/>
  }
  
}

export default HasAdminRole;