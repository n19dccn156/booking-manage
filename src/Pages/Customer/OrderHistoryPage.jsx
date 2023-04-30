import React, { useEffect, useState } from 'react'
import HeaderContainer2 from '../../Containers/HomePageContainer/HeaderContainer';
import { Col, Divider, Image, Input, Typography, message } from 'antd';
import img from '../../Asset/Img/hcm.webp'
import axios from 'axios';
import Constants from '../../Constants/Constants';
import { useNavigate } from 'react-router-dom';

const formatMoney = (value) => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const dateDiff = (checkin, checkout) => {
  const ci = new Date(checkin);
  const co = new Date(checkout);
	// time difference
	const timeDiff = Math.abs(ci.getTime() - co.getTime());
	// days difference
	console.log()
	return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

let total = 0;

const OrderHistoryPage = () => {
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);


	useEffect(() => {
		axios({
			method: 'GET',
			url: `${Constants.host}/api/v1/order/user/${localStorage.getItem('userId')}`
		})
		.then((res) => {
			setOrders(res.data.data);
		})
		.catch((err) => {
			message.error("Cần phải đăng nhập !!");
			navigate('/login');
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  return (
    <div>
      <HeaderContainer2/>
      <Image height={window.innerHeight/2} width={window.innerWidth} src={img}/>
      <Divider><Typography.Title level={3}>Lịch sử đặt phòng</Typography.Title></Divider>
			{orders.length < 1 ? (<></>) : (orders.map((data, index) => {
				total = 0;
				return (
		  	<Col key={index} offset={2} span={20} order={2} style={{marginTop: 32, marginBottom: 48}}>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: 'red', fontWeight: 'bold' }}>
                  Trạng thái
                </div>
                <div style={styles.inputContainer}>
                  <Input value={data.status.name} style={{ height: 48, color: 'red', fontSize: 16 }} maxLength={24} readOnly={true} />
                </div>
                <div>
                  <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#389e0d', fontWeight: 'bold' }}>
                    Ngày đặt
                  </div>
                  <div style={styles.inputContainer}>
                    <Input value={data.createdAt} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#08979c', fontWeight: 'bold' }}>
                  Họ tên
                </div>
                <div style={styles.inputContainer} rules={[{required: true, message: 'Không được bỏ trống !'}]}>
                  <Input value={data.name} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly/>
                </div>
                <div>
                  <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#08979c', fontWeight: 'bold' }}>
                    Số điện thoại
                  </div>
                  <div style={styles.inputContainer}>
                    <Input value={data.phone} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly/>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#0958d9', fontWeight: 'bold' }}>
                  Ngày nhận
                </div>
                <div style={styles.inputContainer}>
                  <Input value={data.checkin} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
                </div>
                <div>
                  <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#0958d9', fontWeight: 'bold' }}>
                    Ngày trả
                  </div>
                  <div style={styles.inputContainer}>
                    <Input value={data.checkout} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
              <div style={{ display: 'flex', border: '2px solid red', }}></div>
              <div style={{ display: 'flex', flex: 10, flexDirection: 'column', paddingLeft: 32 }}>
                <div style={{ maxHeight: 32 }}>
                  <p style={{ fontSize: 16, paddingRight: 16, color: '#006d75', fontWeight: 'bold' }}>{dateDiff(data.checkin, data.checkout)} Đêm</p>
                </div>
                <div style={{ display: 'flex', flex: 3, flexDirection: 'column' }}>
                  {(
										data.orderDetails.map((room, i) => {
                    total += parseFloat(room.price) * parseInt(room.quantity)
                    return (
                      <div key={room.price} style={{ display: 'flex', flex: 1, flexDirection: 'row', maxHeight: 40 }}>
                        <p style={{ display: 'flex', flex: 5, justifyContent: 'flex-start', fontWeight: 'bold', color: '#001d66' }}>{room.hotelOrderId} x {room.quantity} phòng</p>
                        <p style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', fontWeight: 'bold', color: '#73d13d', paddingRight: 16 }}>{formatMoney(room.price)}</p>
                      </div>
                    )
                  }))}
                </div>
                <div style={{ borderTop: '2px solid rgb(191, 191, 191)' }}></div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', maxHeight: 24 }}>
                  <p style={{ fontSize: 12, paddingRight: 16, color: '#006d75', fontWeight: 'bold' }}>Đã bao gồm 10% phí VAT</p>
                </div>
                <div style={{ display: 'flex', flex: 1 }}>
                  <div style={{ display: 'flex', flex: 1, fontWeight: 'bold', color: 'red' }}>
                    <p style={{ fontSize: 16 }}>Tổng tiền</p>
                  </div>
                  <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', fontWeight: 'bold', color: 'red' }}>
										<p style={{ fontSize: 16, paddingRight: 16 }}>{formatMoney(total * dateDiff(data.checkin, data.checkout))} VNĐ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
					<Divider></Divider>
        </Col>
				)}))}
    </div>
  )
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

export default OrderHistoryPage;
