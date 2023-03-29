import React from 'react';
import {
  InfoCircleOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import DetailComponent from '../Components/OrderComponent/DetailComponent';

export const AwaitButton = [
  { title: 'Thời gian', dataIndex: 'createdAt', align: 'center', },
  { title: 'Họ tên', dataIndex: 'name', align: 'center', },
  { title: 'Số điện thoại', dataIndex: 'phone', align: 'center', },
  { title: 'Ngày nhận', dataIndex: 'checkin', align: 'center', sorted: true},
  { title: 'Ngày trả', dataIndex: 'checkout', align: 'center', },
  {
    title: 'Xử lý', dataIndex: '_id', align: 'center',
    render: (_id) => (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button type='primary' icon={<InfoCircleOutlined />} onClick={() => { console.log('chi tiet: ' + _id) }}>Chi tiết</Button>
          {/* <Button type='primary' icon={<InfoCircleOutlined />} onClick={() => { console.log('chi tiet: ' + _id) }} />
          <Button type='primary' onClick={() => { console.log('xac nhan: ' + _id) }}>Xác nhận</Button>
          <Button danger type='dashed' onClick={() => { console.log('huy: ' + _id) }}>Hủy</Button> */}
        </div>
      </>
    ),
  }
];

export const ComfirmButton = [
  { title: 'Thời gian', dataIndex: 'createdAt', align: 'center', },
  { title: 'Họ tên', dataIndex: 'name', align: 'center', },
  { title: 'Số điện thoại', dataIndex: 'phone', align: 'center', },
  { title: 'Ngày nhận', dataIndex: 'checkin', align: 'center', },
  { title: 'Ngày trả', dataIndex: 'checkout', align: 'center', },
  {
    title: 'Xử lý', dataIndex: '_id', align: 'center',
    render: (_id) => (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button type='primary' icon={<InfoCircleOutlined />} onClick={() => { console.log('chi tiet: ' + _id) }}>Chi tiết</Button>
          {/* <Button type='primary' icon={<InfoCircleOutlined />} onClick={() => { console.log('chi tiet: ' + _id) }}>Chi tiết</Button> */}
          {/* <Button type='primary' icon={<InfoCircleOutlined />} onClick={() => { console.log('chi tiet: ' + _id) }} />
          <Button type='primary' onClick={() => { console.log('nhan phong: ' + _id) }}>Nhận phòng</Button>
          <Button danger type='dashed' onClick={() => { console.log('huy: ' + _id) }}>Hủy</Button> */}
        </div>
      </>
    ),
  }
];

export const OngoingButton = [
  { title: 'Thời gian', dataIndex: 'createdAt', align: 'center', },
  { title: 'Họ tên', dataIndex: 'name', align: 'center', },
  { title: 'Số điện thoại', dataIndex: 'phone', align: 'center', },
  { title: 'Ngày nhận', dataIndex: 'checkin', align: 'center', },
  { title: 'Ngày trả', dataIndex: 'checkout', align: 'center', },
  {
    title: 'Xử lý', dataIndex: '_id', align: 'center',
    render: (_id) => (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button type='primary' icon={<InfoCircleOutlined />} onClick={() => { console.log('chi tiet: ' + _id) }}>Chi tiết</Button>
          {/* <Button type='primary' onClick={() => { console.log('tran phong: ' + _id) }}>Trả phòng</Button> */}
        </div>
      </>
    ),
  }
];

export const CompleteButton = [
  { title: 'Thời gian', dataIndex: 'createdAt', align: 'center', },
  { title: 'Họ tên', dataIndex: 'name', align: 'center', },
  { title: 'Số điện thoại', dataIndex: 'phone', align: 'center', },
  { title: 'Ngày nhận', dataIndex: 'checkin', align: 'center', },
  { title: 'Ngày trả', dataIndex: 'checkout', align: 'center', },
  {
    title: 'Xem chi tiết', dataIndex: '_id', align: 'center',
    render: (_id) => (
      <DetailComponent state='Complete'/>
    ),
  }
];

export const CancelButton = [
  { title: 'Thời gian', dataIndex: 'createdAt', align: 'center', },
  { title: 'Họ tên', dataIndex: 'name', align: 'center', },
  { title: 'Số điện thoại', dataIndex: 'phone', align: 'center', },
  { title: 'Ngày nhận', dataIndex: 'checkin', align: 'center', },
  { title: 'Ngày trả', dataIndex: 'checkout', align: 'center', },
  {
    title: 'Xem chi tiết', dataIndex: '_id', align: 'center',
    render: (_id) => {
      return (
      <DetailComponent state='Cancel'/>
    )},
  }
];