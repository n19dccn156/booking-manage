import { Alert, Button, Checkbox, Form, Input, Layout, Typography, message } from 'antd';
import axios from "axios";
import React, { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import Colors from '../Constants/Colors';
import Constants from '../Constants/Constants';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { AdminAction, EmployeeAction, HotelAction, LogoutAction } from '../Actions/LoginAction';
import HeaderContainer2 from '../Containers/HomePageContainer/HeaderContainer';
const { Footer } = Layout;
const { Title } = Typography;

const LoginPage = () => {

	const loggedIn = useSelector((state) => state.loggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [clickLogin, setClickLogin] = useState(false);
	const submit = () => {
		setClickLogin(true);
		axios({
			method: 'POST',
			url: Constants.host + '/api/v1/users/signin',
			data: { 'username': username, 'password': password }
		})
			.then((res) => {
				const orders = localStorage.getItem('orders');
				localStorage.setItem('userId', res.data.data.id);					localStorage.setItem('roleId', res.data.data.roleId)
				localStorage.setItem('roleId', res.data.data.roleId);
				localStorage.setItem('authorization', res.headers.authorization);
				if(orders !== null && orders !== undefined && orders.length > 2) {
					navigate('/confirm');
					return;
				}
				if (res.data.data.roleId === 'CUSTOMER') {
					navigate('/home')
				} else {
					// localStorage.setItem('userId', res.data.data.userId)
					// localStorage.setItem('roleId', res.data.data.roleId)
					localStorage.setItem('authorization', res.headers.authorization)
					message.loading(<Alert message='Đăng nhập thành công' type='success' showIcon />)
					if (res.data.data.roleId === Constants.HOTEL) {
						dispatch(HotelAction())
					}
					else if (res.data.data.roleId === Constants.EMPLOYEE) {
						dispatch(EmployeeAction())
					}
					else if (res.data.data.roleId === Constants.ADMIN) {
						dispatch(AdminAction())
					} else {
						dispatch(LogoutAction())
					}
				}
			})
			.catch((err) => {
				setClickLogin(false);
				if (err.response.data.message.length > 0) {
					message.loading(<Alert message='Đăng nhập thất bại' type='error' description={err.response.data.message} showIcon />)
				} else {
					message.loading(<Alert message='Lỗi hệ thống' type='error' description={'Hệ thống đang bảo trì'} showIcon />)
				}
			})
	}

	if (loggedIn === Constants.HOTEL) {
		return <Navigate to='/' />
	} else if (loggedIn === Constants.EMPLOYEE) {
		return <Navigate to='/employee' />
	} else if (loggedIn === Constants.ADMIN) {
		return <Navigate to='/admin' />
	} else {
		return (
		<Layout style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}>
			<HeaderContainer2/>
			<div style={{ flexDirection: 'column', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ backgroundColor: Colors.bgAbove, width: 500, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 10 }}>
					<Title level={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>Đăng nhập</Title>
					<Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16, }} style={{ justifyContent: 'center', maxWidth: 400 }} initialValues={{ remember: true, }} onFinish={submit} autoComplete="off">

						<Form.Item label="Tài khoản" name="username" rules={[{ required: true, message: 'Tài khoản không bỏ trống !', },]}>
							<Input onChange={usr => setUsername(usr.target.value)} />
						</Form.Item>

						<Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Mật khẩu không bỏ trống !', },]}>
							<Input.Password onChange={psw => setPassword(psw.target.value)} />
						</Form.Item>

						<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16, }}>
							<Checkbox>Nhớ thông tin<Link to={'http://phuquytravel.click/booking/swagger-ui.html'} style={{ paddingLeft: 36 }}>Quên mật khẩu ?</Link></Checkbox>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16, }}>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Button type="primary" htmlType="submit" size='large' loading={clickLogin} style={{ width: 200 }}> Đăng nhập</Button>
							</div>
						</Form.Item>
					</Form>
				</div>
			</div>
			<Footer style={styleSheet.footer}>
				BOOKING ©2023 Created by students
			</Footer>
		</Layout>
		);
	}
}

const styleSheet = {
	footer: {
		textAlign: "center",
		fontSize: 12,
		backgroundColor: '#f0f0f0',
		borderRadius: 5
	}
}
export default LoginPage;