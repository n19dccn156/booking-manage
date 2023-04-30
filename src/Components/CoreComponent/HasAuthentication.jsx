import axios from 'axios'
import React from 'react'
import Constants from '../../Constants/Constants'
import { message } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const HasAuthentication = () => {
    const navigate = useNavigate();

    if(localStorage.getItem('authorization').length > 7) {
        axios({
            method: 'GET',
            url: Constants.host+'/api/v1/users/authorization',
            headers: {
                "Authorization": localStorage.getItem('authorization'),
            }
        })
        .then((res) => {
            console.log(res.data)
            return <Outlet/>
        })
        .catch((err) => {
            message.error("Cần phải đăng nhập");
            navigate('/login');
            return;
        })
    } else {
        navigate('/login');
        return;
    }
}

export default HasAuthentication;
