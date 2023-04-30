import React, { useEffect } from 'react';
import {
	InfoCircleOutlined
} from '@ant-design/icons';
import { Button, Input, Modal, message } from "antd";
import { useState } from "react";
import Constants from '../../Constants/Constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ReloadConfirmTable } from '../../Actions/ReloadTableAction';

const formatMoney = (amount) => {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const DetailComfirmComponent = React.memo((props) => {
	const update = useSelector((state) => state.reloadConfirm);
	const dispatch = useDispatch();
	const [order, setOrder] = useState("");
	const [orderDetail, setOrderDetail] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isCancel, setIsCancel] = useState(false);
	const [isConfirm, setIsConfirm] = useState(false);
	let total = 0;
	const url = Constants.host + `/api/v1/order/${props.id}/status/`;
	const token = localStorage.getItem('authorization')

	const handleExit = () => {setIsOpen(false)}
	const handleOk = () => {setIsConfirm(true)}
	const handleCancel = () => {setIsCancel(true)}
	const notCancel = () => {setIsCancel(false)}
	const notConfirm = () => {setIsConfirm(false)}

	const confirmCancel = () => {
		axios({
			url: url+Constants.STATUS.CANCEL,
			method: 'PUT',
			headers: {'Authorization': token, 'Content-Type': 'application/json'}
		})
		.then(() => {
			message.success("Huỷ đơn thành công !!");
			setIsCancel(false);
			setIsOpen(false);
			dispatch(ReloadConfirmTable(!update));
		})
		.catch(() => {
			message.error("Huỷ đơn thất bại !!");
			setIsCancel(false);
		})
	}
	const confirm = () => {
		axios({
			url: url+Constants.STATUS.ONGOING,
			method: 'PUT',
			headers: {'Authorization': token, 'Content-Type': 'application/json'}
		})
		.then(() => {
			message.success("Nhận phòng thành công !!");
			setIsConfirm(false);
			setIsOpen(false);
			dispatch(ReloadConfirmTable(!update));
		})
		.catch(() => {
			message.error("Nhận phòng thất bại !!");
			setIsConfirm(false)
		})
	}

	useEffect(() => {
		const urlOrder = Constants.host+`/api/v1/order/${props.id}`;
		const urlOrderDetail = Constants.host+`/api/v1/order-detail/${props.id}`;

		axios.get(urlOrder, {method: 'GET'})
		.then((res) => {setOrder(res.data.data)})
		.catch((err) => {console.log(err)})

		axios.get(urlOrderDetail, {method: 'GET'})
		.then((res) => {setOrderDetail(res.data.data)})
		.catch((err) => {console.log(err)})
		
	}, [props])

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<Button type='primary' icon={<InfoCircleOutlined />} onClick={() => { setIsOpen(true);}}>Chi tiết</Button>
			</div>
			{order !== ""  && orderDetail !== "" ? (
			<Modal
				title={
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
							{/* <p style={{ color: '#006d75' }}>Khách sạn Phương Nam</p> */}
							<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
								<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: 'red', fontWeight: 'bold' }}>
									Trạng thái
								</div>
								<div style={styles.inputContainer}>
									<Input value={order.status.name} style={{ height: 48, color: '#8c8c8c', fontSize: 16, textAlign: 'right', border: '2px dotted rgb(9, 88, 217)', fontWeight: 'bold' }} readOnly={true} />
								</div>
							</div>
						</div>
						<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
							<p style={{}}>Chi tiết Giá</p>
							<div style={{ border: '2px dotted rgb(0, 44, 140)' }}></div>
						</div>
					</div>
				}
				open={isOpen} onOk={handleOk} onCancel={handleExit}
				width={1000}
				footer={[
					<Button key='close' onClick={handleExit}>Đóng</Button>,
					<Button key='cancel' danger onClick={handleCancel}>Hủy đơn</Button>,
					<Button key='submit' type="primary" onClick={handleOk}>Nhận phòng</Button>
				]}>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
						<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
							<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#389e0d', fontWeight: 'bold' }}>
								Mã đơn
							</div>
							<div style={styles.inputContainer}>
								<Input value={100_000_000+order.id} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} maxLength={24} readOnly={true} />
							</div>
							<div>
								<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#389e0d', fontWeight: 'bold' }}>
									Ngày đặt
								</div>
								<div style={styles.inputContainer}>
									<Input value={order.createdAt} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
								</div>
							</div>
						</div>

						<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
							<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#08979c', fontWeight: 'bold' }}>
								Họ tên
							</div>
							<div style={styles.inputContainer}>
								<Input value={order.name} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
							</div>
							<div><div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#08979c', fontWeight: 'bold' }}>
								Số điện thoại
							</div>
								<div style={styles.inputContainer}>
									<Input value={order.phone} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
								</div>
							</div>
						</div>

						<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
							<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#0958d9', fontWeight: 'bold' }}>
								Ngày nhận
							</div>
							<div style={styles.inputContainer}>
								<Input value={order.checkin} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
							</div>
							<div>
								<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#0958d9', fontWeight: 'bold' }}>
									Ngày trả
								</div>
								<div style={styles.inputContainer}>
									<Input value={order.checkout} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
								</div>
							</div>
						</div>
					</div>
					<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
						<div style={{ display: 'flex', border: '2px solid red', }}></div>
						<div style={{ display: 'flex', flex: 10, flexDirection: 'column', paddingLeft: 32 }}>
							<div style={{ maxHeight: 32 }}>
								<p style={{ fontSize: 16, paddingRight: 16, color: '#006d75', fontWeight: 'bold' }}>{orderDetail !== "" ? orderDetail[0].numDay : 0} Đêm</p>
							</div>
							<div style={{ display: 'flex', flex: 3, flexDirection: 'column' }}>
								{orderDetail.map((room, i) => {
									total += parseFloat(room.price) * parseInt(room.quantity)
									return (
										<div key={room.roomTypeId} style={{ display: 'flex', flex: 1, flexDirection: 'row', maxHeight: 40 }}>
											<p style={{ display: 'flex', flex: 5, justifyContent: 'flex-start', fontWeight: 'bold', color: '#001d66' }}>{room.roomName} x {room.quantity} phòng</p>
											<p style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', fontWeight: 'bold', color: '#73d13d', paddingRight: 16 }}>{formatMoney(room.price)}</p>
										</div>
									)
								})}
							</div>
							<div style={{ borderTop: '2px solid rgb(191, 191, 191)' }}></div>
							<div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', maxHeight: 24 }}>
								<p style={{ fontSize: 12, paddingRight: 16, color: '#006d75', fontWeight: 'bold' }}>Đã bao gồm 10% phí VAT</p>
							</div>
							<div style={{ display: 'flex', flex: 1 }}>
								<div style={{ display: 'flex', flex: 1, fontWeight: 'bold', color: 'red' }}>
									<p style={{ fontSize: 16 }}>Tổng tiền</p>
								</div>
								<div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', fontWeight: 'bold', color: '#73d13d' }}>
									<p style={{ fontSize: 16, paddingRight: 16 }}>{formatMoney(total * orderDetail[0].numDay)} VNĐ</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>) :  <></>}
			<Modal title="Bạn có đồng ý 'huỷ đơn' ? " open={isCancel} onCancel={notCancel} onOk={confirmCancel}></Modal>
			<Modal title="Bạn có đồng ý 'nhận phòng' ? " open={isConfirm} onCancel={notConfirm} onOk={confirm}></Modal>
		</>
	);
}
)
const styles = ({
	labelContainer: {
		backgroundColor: "white", // Same color as background
		alignSelf: "flex-start", // Have View be same width as Text inside
		paddingHorizontal: 3, // Amount of spacing between border and first/last letter
		marginStart: 10, // How far right do you want the label to start
		zIndex: 1, // Label must overlap border
		elevation: 1, // Needed for android
		shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
		position: "absolute", // Needed to be able to precisely overlap label with border
		top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
	},
	inputContainer: {
		borderWidth: 1, // Create border
		borderRadius: 8, // Not needed. Just make it look nicer.
		padding: 8, // Also used to make it look nicer
		zIndex: 0, // Ensure border has z-index of 0
	},
});

export default DetailComfirmComponent;