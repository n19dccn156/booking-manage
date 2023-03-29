import React from 'react';
import {
	InfoCircleOutlined
} from '@ant-design/icons';
import { Button, Input, Modal } from "antd";
import { useState } from "react";

const formatMoney = (amount) => {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const rooms = [
	{ _id: '1234567', name: 'Phòng giường đôi VIP', numDays: '4', quantity: '3', price: '500000' },
	{ _id: '8598234', name: 'Phòng giường đơn VIP', numDays: '4', quantity: '1', price: '300000' },
	{ _id: '2758723', name: 'Phòng tập thể', numDays: '4', quantity: '1', price: '800000' },
];

const DetailCancelComponent = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOk = () => {
		setIsOpen(false);
	}
	const handleCancel = () => {
		setIsOpen(false);
	}
	let total = 0;
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<Button type='primary' icon={<InfoCircleOutlined />} onClick={() => { setIsOpen(true) }}>Chi tiết</Button>
			</div>
			<Modal
				title={
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
							<p style={{ color: '#006d75' }}>Khách sạn Phương Nam</p>
							<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
								<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: 'red', fontWeight: 'bold' }}>
									Trạng thái
								</div>
								<div style={styles.inputContainer}>
									<Input value='Đã hủy' style={{ height: 48, color: '#8c8c8c', fontSize: 16, textAlign: 'right', border: '2px dotted rgb(9, 88, 217)', fontWeight: 'bold' }} readOnly={true} />
								</div>
							</div>
						</div>
						<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
							<p style={{}}>Chi tiết Giá</p>
							<div style={{ border: '2px dotted rgb(0, 44, 140)' }}></div>
						</div>
					</div>
				}
				open={isOpen} onCancel={handleCancel}
				width={1000}
				footer={[
					<Button key='close' onClick={handleCancel}>Đóng</Button>,
					// <Button key='cancel' danger onClick={handleCancel}>Hủy đơn</Button>,
					// <Button key='submit' type="primary" onClick={handleOk}>Nhận phòng</Button>
				]}>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
						<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
							<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#389e0d', fontWeight: 'bold' }}>
								Mã đơn
							</div>
							<div style={styles.inputContainer}>
								<Input value='63d730fca730ca3f1dda8317' style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
							</div>
							<div>
								<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#389e0d', fontWeight: 'bold' }}>
									Ngày đặt
								</div>
								<div style={styles.inputContainer}>
									<Input value="20-9-2001 22:22:00" style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
								</div>
							</div>
						</div>

						<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
							<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#08979c', fontWeight: 'bold' }}>
								Họ tên
							</div>
							<div style={styles.inputContainer}>
								<Input value='Nguyễn Thanh Sang' style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
							</div>
							<div><div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#08979c', fontWeight: 'bold' }}>
								Số điện thoại
							</div>
								<div style={styles.inputContainer}>
									<Input value="0334428102" style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
								</div>
							</div>
						</div>

						<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
							<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#0958d9', fontWeight: 'bold' }}>
								Ngày nhận
							</div>
							<div style={styles.inputContainer}>
								<Input value='20/08/2001 12:00' style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
							</div>
							<div>
								<div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#0958d9', fontWeight: 'bold' }}>
									Ngày trả
								</div>
								<div style={styles.inputContainer}>
									<Input value="24/08/2001 11:00" style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
								</div>
							</div>
						</div>
					</div>
					<div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
						<div style={{ display: 'flex', border: '2px solid red', }}></div>
						<div style={{ display: 'flex', flex: 10, flexDirection: 'column', paddingLeft: 32 }}>
							<div style={{ maxHeight: 32 }}>
								<p style={{ fontSize: 16, paddingRight: 16, color: '#006d75', fontWeight: 'bold' }}>{rooms[0].numDays} Đêm</p>
							</div>
							<div style={{ display: 'flex', flex: 3, flexDirection: 'column' }}>
								{rooms.map((room, i) => {
									total += parseFloat(room.price) * parseInt(room.quantity)
									return (
										<div key={room._id} style={{ display: 'flex', flex: 1, flexDirection: 'row', maxHeight: 40 }}>
											<p style={{ display: 'flex', flex: 5, justifyContent: 'flex-start', fontWeight: 'bold', color: '#001d66' }}>{room.name} x {room.quantity} phòng</p>
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
									<p style={{ fontSize: 16, paddingRight: 16 }}>{formatMoney(total * rooms[0].numDays)} VNĐ</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

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

export default DetailCancelComponent;