import {Button, Image, Input} from 'antd';
import React, { useEffect, useState } from 'react'

import { BankOutlined, CheckOutlined, CloseOutlined, FieldNumberOutlined, NumberOutlined } from '@ant-design/icons';
import Constants from '../../Constants/Constants';
import { useDispatch } from 'react-redux';
import { AddRoomAction } from '../../Actions/AddRoomAction';

const formatMoney = (value) => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const RoomInOrderContainer = (props) => {
  const dispatch = useDispatch();
  const [choose, setChoose] = useState(false);
  const [number, setNumber] = useState(props.room.quantity);

  useEffect(() => {
    const orders = localStorage.getItem('orders');
    if(orders?.split(`${props.room.id}:`).length === 2) {
      setChoose(true);
    }
  }, [props.room.id])

  const clickChoose = () => {
    let orders = localStorage.getItem('orders') ?? '';
    const value = `${props.room.id}:${number}`;
    if(orders.length < 3) {
      localStorage.setItem('orders', value);
      setChoose(true);
      dispatch(AddRoomAction());
      return;
    }
    orders += `,${value}`;
    localStorage.setItem('orders', orders);
    setChoose(true);
    dispatch(AddRoomAction());
    return;
  }
  const clickCancel = () => {
    const orders = localStorage.getItem('orders');
    const value = `${props.room.id}:${number}`;

    const list = orders.split(',');
    list.forEach((data, index) => {
      if(data === value) {
        if(index === 0) {
          localStorage.setItem('orders', orders.replace(`${data}`, ""))
          setChoose(false);
        } else {
          localStorage.setItem('orders', orders.replace(`,${data}`, ""))
          setChoose(false);
        }
        dispatch(AddRoomAction());
      }
    })
  }

  const changeNumber = (data) => {
    setNumber(data.target.value)
  }

  return (
    <div style={{ display: 'flex', margin: '16px 0 32px 16px', borderRadius: 12, opacity: props.isActive ? 1 : 0.7, backgroundColor: props.isActive ? '#fafafa' : '#8c8c8c' }}>
      <Image style={{ display: 'flex', flex: 1, maxWidth: 200, height: 200, borderRadius: 5, margin: '8px 0 8px 8px' }} src={Constants.host+props.room.avatar}/>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px', justifyContent: 'space-evenly' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flex: 2.8, alignItems: 'center', fontWeight: 'bold', justifyContent: 'space-around' }}>

          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, marginLeft: 16 }}>
          <Input style={{ display: 'flex', flex: 5, fontSize: 16 }} prefix={<BankOutlined style={{ color: '#bfbfbf' }}/>} value={props.room.name} disabled={!props.isActive} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, marginLeft: 16 }}>
          <Input style={{ display: 'flex', flex: 3, fontSize: 16 }} prefix={<FieldNumberOutlined style={{ color: '#bfbfbf' }} />} value={props.room.quantity} disabled={!props.isActive} />
          <Input style={{ display: 'flex', flex: 5, fontSize: 16, marginLeft: 8 }} prefix={<NumberOutlined style={{ color: '#bfbfbf' }}/>} value={formatMoney(props.room.price)} disabled={!props.isActive} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, paddingLeft: 8, justifyContent: 'space-around' }}>
          Số lượng: <Input type='number' value={number} min={1} max={props.room.quantity} onChange={changeNumber}/>
          {choose === false ?
          (<Button type='primary' style={{minWidth: window.innerWidth/5, height: 40, marginLeft: 8}} icon={<CheckOutlined />} disabled={!props.isActive} onClick={clickChoose}>Chọn phòng</Button>)
          :
          (<Button danger type='primary' style={{minWidth: window.innerWidth/5, height: 40, marginLeft: 8}} icon={<CloseOutlined/>} disabled={!props.isActive} onClick={clickCancel}>Bỏ chọn</Button>)}
        </div>
      </div>
			{props.isActive === false ? (
				<div style={{position: 'absolute', borderRadius: 8, fontSize: 24, color: 'white', marginTop: 70, marginLeft: window.innerWidth/4, fontWeight: 'bold', backgroundColor: 'red', padding: '16px 16px 16px 16px'}}>
					Hết phòng
				</div>
			) : (<></>)}
    </div>
  )
}

export default RoomInOrderContainer;
