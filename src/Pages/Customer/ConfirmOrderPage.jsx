import React, { useEffect, useState } from 'react'
import Constants from '../../Constants/Constants'
import axios from 'axios'
import { Button, Col, Image, Input, Steps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import HeaderContainer2 from '../../Containers/HomePageContainer/HeaderContainer'
import img from '../../Asset/Img/hcm.webp'

const formatMoney = (value) => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const dateCurrent = () => {
  const date = new Date().toLocaleDateString().split('/');
  return `${date[1]}-${date[0]}-${date[2]}`;
}

const dateDiff = () => {

  const ci = new Date(localStorage.getItem('ci'));
  const co = new Date(localStorage.getItem('co'));

  return Math.floor(
    (Date.UTC(co.getFullYear(), co.getMonth(), co.getDate()) 
    - Date.UTC(ci.getFullYear(), ci.getMonth(), ci.getDate()) ) 
    /(1000 * 60 * 60 * 24)
  );
}

let listOrder = [];

const ConfirmOrderPage = () => {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  let total = 0;

  const clickOrder = () => {
    if(name.length === 0) {
      message.warning('Hãy nhập tên khách hàng')
      return;
    }
    if(phone.length !== 10) {
      message.warning('Hãy nhập đúng số điện thoại')
      return;
    }
    axios({
      method: 'POST',
      url: Constants.host+'/api/v1/order',
      data: {
        "checkin": localStorage.getItem('ci'),
        "checkout": localStorage.getItem('co'),
        "hotelId": localStorage.getItem('hotelId'),
        "name": name,
        "orderDetails": listOrder,
        "phone": phone,
        "userId": localStorage.getItem('userId')
      }
    })
    .then(res => {
      console.log(res.data);
      localStorage.removeItem('orders');
      navigate('/success');
    })
    .catch(err => {
      message.error(err.response.data.message);
    })
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: Constants.host+'/api/v1/users/authorization',
      headers: {
        "Authorization": localStorage.getItem('authorization'),
      }
    })
    .then(() => {
      axios({
        method: 'GET',
        url: Constants.host+'/api/v1/order/confirm',
        params: {
          "orders": localStorage.getItem('orders')
        }
      })
      .then((res) => {
        setCart(res.data.data);
        res.data.data.forEach((data) => {
          const order = {roomId: data.id, quantity: data.quantity}
          listOrder.push(order);
        })
      })
      .catch((err) => {
        console.log(err.response.data);
      })
    })
    .catch((err) => {
        message.error("Cần phải đăng nhập");
        navigate('/login');
        return;
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>
      <HeaderContainer2 />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Image height={window.innerHeight/2} width={window.innerWidth} src={img}/>
      </div>      
      {/* <Divider style={{marginTop: 100}}>
        <Typography.Title level={3}>Xác nhận đơn đặt</Typography.Title>
      </Divider> */}
      {/* <div style={{display: 'flex', flexDirection: 'row'}}> */}
        <Col offset={2} span={20} order={2} style={{marginTop: 100}}>
          <Steps 
            direction='horizontal' 
            current={1}
            items={[
              {title: 'Đã hoàn thành', description: 'Chọn phòng'},
              {title: 'Đang thực hiện', description: 'Xác nhận đơn đặt'},
              {title: 'Đang chờ', description: 'Hoàn thành',}]}/>
        </Col>
        {/* <Divider style={{marginTop: 48}}>
          <Typography.Title level={4}>Đơn đặt</Typography.Title>
        </Divider> */}
        <Col offset={2} span={20} order={2} style={{marginTop: 32, marginBottom: 48}}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: 'red', fontWeight: 'bold' }}>
                  Trạng thái
                </div>
                <div style={styles.inputContainer}>
                  <Input value='Xác nhận đơn đặt' style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} maxLength={24} readOnly={true} />
                </div>
                <div>
                  <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#389e0d', fontWeight: 'bold' }}>
                    Ngày đặt
                  </div>
                  <div style={styles.inputContainer}>
                    <Input value={dateCurrent()} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#08979c', fontWeight: 'bold' }}>
                  Họ tên
                </div>
                <div style={styles.inputContainer} rules={[{required: true, message: 'Không được bỏ trống !'}]}>
                  <Input value={name} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} onChange={(data) => setName(data.target.value)}/>
                </div>
                <div>
                  <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#08979c', fontWeight: 'bold' }}>
                    Số điện thoại
                  </div>
                  <div style={styles.inputContainer}>
                    <Input value={phone} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} onChange={(data) => setPhone(data.target.value)}/>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#0958d9', fontWeight: 'bold' }}>
                  Ngày nhận
                </div>
                <div style={styles.inputContainer}>
                  <Input value={localStorage.getItem('ci')} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
                </div>
                <div>
                  <div style={{ position: 'absolute', zIndex: 2, backgroundColor: 'white', marginLeft: 24, textDecoration: 'none', color: '#0958d9', fontWeight: 'bold' }}>
                    Ngày trả
                  </div>
                  <div style={styles.inputContainer}>
                    <Input value={localStorage.getItem('co')} style={{ height: 48, color: '#8c8c8c', fontSize: 16 }} readOnly={true} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
              <div style={{ display: 'flex', border: '2px solid red', }}></div>
              <div style={{ display: 'flex', flex: 10, flexDirection: 'column', paddingLeft: 32 }}>
                <div style={{ maxHeight: 32 }}>
                  <p style={{ fontSize: 16, paddingRight: 16, color: '#006d75', fontWeight: 'bold' }}>{dateDiff()} Đêm</p>
                </div>
                <div style={{ display: 'flex', flex: 3, flexDirection: 'column' }}>
                  {cart.map((room, i) => {
                    total += parseFloat(room.price) * parseInt(room.quantity)
                    return (
                      <div key={room.id} style={{ display: 'flex', flex: 1, flexDirection: 'row', maxHeight: 40 }}>
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
                  <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', fontWeight: 'bold', color: 'red' }}>
                    <p style={{ fontSize: 16, paddingRight: 16 }}>{formatMoney(total * dateDiff())} VNĐ</p>
                  </div>
                </div>
                <Col offset={20} span={2} order={2} style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <Button type='primary' onClick={clickOrder}>Đặt phòng</Button>
                </Col>
              </div>
            </div>
          </div>
          
        </Col>
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

export default ConfirmOrderPage;
