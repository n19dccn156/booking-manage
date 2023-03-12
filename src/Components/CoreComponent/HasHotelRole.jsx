// import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Constants from "../../Constants/Constants";

const HasHotelRole = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('authorization');
    const roleId = localStorage.getItem('roleId');
    function authoz (access_token) {
      if(access_token !== null && access_token.startsWith("Bearer") && roleId === 'HOTEL') {
        axios({
          method: "POST",
          url: Constants.host+Constants.URL_AUTHOZ,
          headers: {Authorization: access_token}
        })
        .then((res) => {
          if(res.data.data !== 'HOTEL') {
            navigate('/employee', {replace: true})
          }
        })
        .catch((err) => {
          message.error(err.data.data.message)
          navigate('/login', {replace: true})
        })
      } else {
        navigate('/employee', {replace: true})
      }
    }
    authoz(token)
  })

  return (<Outlet/>);
}

export default HasHotelRole;