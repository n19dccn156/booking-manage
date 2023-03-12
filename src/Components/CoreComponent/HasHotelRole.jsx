// import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Constants from "../../Constants/Constants";

const HasHotelRole = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem('authorization');
  const roleId = localStorage.getItem('roleId');

  if(access_token !== null && access_token.startsWith("Bearer") && roleId === 'ADMIN') {
    axios({
      method: "POST",
      url: Constants.host+Constants.URL_AUTHOZ,
      headers: {Authorization: access_token}
    })
    .then((res) => {
      if(res.data.data !== 'HOTEL') {
        return <Navigate to='/login'/>
      }
      // if(res.data.data !== 'ADMIN') {
      //   navigate('/login')
      // }
    })
    .catch((err) => {
      message.error(err.data.data.message)
      return <Navigate to='/login'/>
    })
  } else {
    return <Navigate to='/login'/>
    // navigate('/login', {replace: true})
  }  

  return <Outlet/>
}

export default HasHotelRole;