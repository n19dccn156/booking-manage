import { Badge, Button, Divider, Layout, Modal, Table, message, Typography, Form, Input, Col, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import Colors from "../../Constants/Colors";
import { PlusOutlined } from "@ant-design/icons";
import Constants from "../../Constants/Constants";
import axios from "axios";
import RegisterHotel from "../../Constants/RegisterHotel";
const { Content } = Layout;

const TableHotelComponent = () => {
	const changeActive = (id) => {
		axios({
			method: 'PATCH',
			url: Constants.host+'/api/v1/hotels/'+id,
			headers: {
				"Authorization": localStorage.getItem('authorization')
			}
		})
		.then((res) => {
			message.success(res.data.message);
			setReload(!reload);
		})
		.catch((err) => {
			message.error(err.response.data.message);
		})
	}
	const columns = [
		{ title: "Mã", dataIndex: "id", align: "center" },
		{ title: "Tên khách sạn", dataIndex: "name", align: "center" },
		{ title: "Địa chỉ", dataIndex: "address", align: "center" },
		{ title: "Số điện thoại", dataIndex: "phone", align: "center" },
		{ title: "Loại nhà ở", dataIndex: "typeHotelId", align: "center" },
		{ title: "Trạng thái", dataIndex: "active",  align: "center", 
			render: ((active) => (
				active ? 
				(<Badge status='processing' color='green' text='Đang hoạt động'/>) : 
				(<Badge status='processing' color='red' text='Dừng hoạt động'/>)
			))},
		{ title: "Thao tác", dataIndex: ["id", "active"], align: "center",
			render: ((text, row) => (
				<div style={{display: 'flex', justifyContent: 'space-evenly'}}>
					 <Button key={row.id+'on'} type="primary" disabled={row.active} onClick={() => {changeActive(row.id)}}>Mở</Button>
					 <Button key={row.id+'off'} danger type="primary" disabled={!row.active} onClick={() => {changeActive(row.id)}}>Dừng</Button>
				</div>
			)
			)},
	];
	const clickAdd = () => {
		setIsOpen(true);
	}
	const clickCancel = () => {
		setIsOpen(false);
	}
	const add = () => {
		console.log(form)
		axios({
			method: 'POST',
			url: Constants.host+'/api/v1/hotels',
			data: {
				username: form.username,
				password: form.password,
				firstname: form.firstname,
				lastname: form.lastname,
				phone: form.phone,
				email: form.email,
				birthday: form.birthday,
				gender: form.gender,
				name: form.name,
				address: form.address,
				checkin: form.checkin,
				checkout: form.checkout,
				province: form.province,
				hotelType: form.hotelType,
				phoneHotel: form.phoneHotel
			},
			headers: {
				"Authorization": localStorage.getItem('authorization')
			}
		})
		.then((res) => {
			console.log(res.data.data)
			message.success(res.data.message)
			setIsOpen(false);
			setReload(!reload)
		})
		.catch((err) => {
			console.log(err.response.data);
			message.error(err.response.data.message);
		})
	}
	const [isOpen, setIsOpen] = useState(false);
	const [form, setForm] = useState(RegisterHotel);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 7,
    },
  });

  useEffect(() => {
		setLoading(true);

		axios({
			method: 'GET',
			url: Constants.host + '/api/v1/hotels/',
			params: {
				page: tableParams.pagination.current,
				size: tableParams.pagination.pageSize
			}
		})
			.then((results) => {
				console.log(results.data.data)	
				setData(results.data.data.content);
				setLoading(false);
				setTableParams({
					...tableParams,
					pagination: {
						...tableParams.pagination,
						total: results.data.data.totalElements,
					},
				});
			})
			.catch((err) => {
				message.error(err.response.data.message);
				return;
			});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams.pagination.current, reload]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <Content style={styleSheet.content}>
      <Divider style={{display: 'flex', marginTop: 32, flexDirection: 'row'}}>
				Danh sách khách sạn
				<Button type="primary" icon={<PlusOutlined/>} style={{marginLeft: window.innerWidth/16}} onClick={clickAdd}>
					Thêm khách sạn
				</Button>
			</Divider>
      <div style={{ display: "flex", justifyContent: "center" }}>
				<Table columns={columns} rowKey={(record) => record.id}
					dataSource={data} pagination={tableParams.pagination}
					loading={loading} onChange={handleTableChange}
					style={{ width: '95%' }} size='small'
					rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : ''}
				/>
      </div>
			<Modal 
				width={window.innerWidth/1.5}
				title={<Typography.Title level={3} style={{display: 'flex', justifyContent: 'center'}}>Thêm khách sạn</Typography.Title>} 
				open={isOpen} 
				onCancel={clickCancel} 
				onOk={add}>
				<Typography.Title level={4}>Thông tin người quản trị</Typography.Title>
				<Form style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
					<Col span={10}>
						<Form.Item name='username' 
											label='Tài khoản' 
											rules={[{required: true, message: "Tài khoản không được bỏ trống"}]}>
							<Input placeholder="Nhập tên tài khoản"
										onChange={(dt) => {
											const copy = form;
											copy.username = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item name='password' 
											label='Mật khẩu' 
											rules={[{required: true, message: "Mật khẩu không được bỏ trống"}]}>
							<Input.Password placeholder="Nhập mật khẩu"
										onChange={(dt) => {
											const copy = form;
											copy.password = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>

					<Col span={10}>
						<Form.Item name='firstname' 
											label='Họ' 
											rules={[{required: true, message: "Họ không được bỏ trống"}]}>
							<Input placeholder="Nhập họ và tên lót"
										onChange={(dt) => {
											const copy = form;
											copy.firstname = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item name='lastname' 
											label='Tên' 
											rules={[{required: true, message: "Tên không được bỏ trống"}]}>
							<Input placeholder="Nhập tên"
										onChange={(dt) => {
											const copy = form;
											copy.lastname = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>

					<Col span={10}>
						<Form.Item name='phone' 
											label='Số điện thoại' 
											rules={[
												// {type: 'number', message: "Số điện thoại không đúng định dạng"},
												{pattern: /^[\d]{10}$/, message: "Số điện thoại phải 10 ký tự"},
												{required: true, message: "Số điện thoại không được bỏ trống"}]}>
							<Input placeholder="Nhập số điện thoại"
										onChange={(dt) => {
											const copy = form;
											copy.phone = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item name='email' 
											label='Email' 
											rules={[
												{type: 'email', message: "Email không đúng định dạng"},
												{required: true, message: "Email không được bỏ trống"}]}>
							<Input placeholder="Nhập email"
										onChange={(dt) => {
											const copy = form;
											copy.email = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>

					<Col span={10}>
						<Form.Item name='birthday' 
											label='Ngày sinh' 
											rules={[{required: true, message: "Ngày sinh không được bỏ trống"}]}>
							<DatePicker onChange={(dt) => {
													const copy = form;
													copy.birthday = dt.$y+'-'+(dt.$M+1)+'-'+dt.$D;
													setForm(copy);}}/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item name='gender' 
											label='Giới tính' 
											rules={[{required: true, message: "Giới tính không được bỏ trống"}]}>
							<Select 
								value={form.gender}
								options={[{value: 'Nam'}, {value: 'Nữ'}, {value: 'Khác'}]}
								onChange={(dt) => {
									const copy = form;
									copy.gender = dt;
									setForm(copy);}}/>
						</Form.Item>
					</Col>
				</Form>

				<Typography.Title level={4}>Thông tin khách sạn</Typography.Title>
				<Form style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
					<Col span={10}>
						<Form.Item name='name' 
											label='Tên khách sạn' 
											rules={[{required: true, message: "Tên khách sạn không được bỏ trống"}]}>
							<Input placeholder="Nhập tên khách sạn"
										onChange={(dt) => {
											const copy = form;
											copy.name = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item name='address' 
											label='Địa chỉ' 
											rules={[{required: true, message: "Địa chỉ không được bỏ trống"}]}>
							<Input placeholder="Nhập địa chỉ"
										onChange={(dt) => {
											const copy = form;
											copy.address = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>

					<Col span={10}>
						<Form.Item name='checkin' 
											label='Thời gian nhận phòng' 
											rules={[{required: true, message: "Thời gian nhận không được bỏ trống"}]}>
							<Select value={form.checkin} 
											onChange={(dt) => {
												const copy = form;
												copy.checkin = dt;
												setForm(copy);}}
											options={[{value: '12h : 00', label: '12h : 00'},
																{value: '13h : 00', label: '13h : 00'},
																{value: '14h : 00', label: '14h : 00'}]}/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Form.Item name='checkout' 
											label='Thời gian trả phòng' 
											rules={[
												{required: true, message: "Thời gian trả không được bỏ trống"}]}>
							<Select value={form.checkout} 
											onChange={(dt) => {
												const copy = form;
												copy.checkout = dt;
												setForm(copy);}}
											options={[{value: '10h : 00', label: '10h : 00'},
																{value: '11h : 00', label: '11h : 00'},
																{value: '12h : 00', label: '12h : 00'}]}/>
						</Form.Item>
					</Col>

					<Col span={10}>
						<Form.Item name='province' 
											label='Thành phố/tỉnh' 
											rules={[{required: true, message: "Thành phố/tỉnh không được bỏ trống"}]}>
							<Select value='BINHTHUAN' 
											onChange={(dt) => {
												const copy = form;
												copy.province = dt;
												setForm(copy);}}
											options={[{value: 'BINHTHUAN', label: 'Bình Thuận'},
																{value: 'HOCHIMINH', label: 'TP. Hồ Chí Minh'},
																{value: 'VUNGTAU', label: 'Bà Rịa - Vũng tàu'}]}/>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item name='hotelType' 
											label='Loại nhà ở' 
											rules={[{required: true, message: "Loại nhà ở không được bỏ trống"}]}>
						<Select value='HOTEL'
										onChange={(dt) => {
											const copy = form;
											copy.hotelType = dt;
											setForm(copy);}}
										options={[{value: 'HOTEL', label: 'Khách sạn'},
															{value: 'HOMESTAY', label: 'Homestay'},
															{value: 'VILLA', label: 'Villa'}]}/>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item name='phoneHotel' 
											label='Số điện thoại' 
											rules={[
												{pattern: /^[\d]{10}$/, message: "Số điện thoại phải 10 ký tự"},
												{required: true, message: "Số điệ thoại không được bỏ trống"}]}>
							<Input placeholder="Nhập số điện thoại"
										onChange={(dt) => {
											const copy = form;
											copy.phoneHotel = dt.target.value;
											setForm(copy);}}/>
						</Form.Item>
					</Col>

				</Form>
			</Modal>
    </Content>
  );
};
const styleSheet = {
  content: {
    margin: "8px 0 8px",
    minHeight: 520,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
  },
};

export default TableHotelComponent;
