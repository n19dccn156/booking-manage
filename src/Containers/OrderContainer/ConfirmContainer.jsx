import {
  ReloadOutlined,
  UserOutlined,
  PhoneOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Layout, Tabs, Modal, Form, Input, DatePicker, Space, Select, InputNumber, message } from 'antd';
import React, { useEffect, useState } from 'react';

// import TableComponent from '../../Components/OrderComponent/TableComponent';
import Colors from '../../Constants/Colors';
import '../../index.css'
import { Link } from 'react-router-dom';
import TableCom from '../../Components/OrderComponent/Table';
import Constants from '../../Constants/Constants';
import { useSelector } from 'react-redux';
import axios from 'axios';
const { Content } = Layout;
const { RangePicker } = DatePicker

const items2 = [
  {
    key: '0',
    label: (<Link style={{ color: 'black' }} to={'/order/await'}>Chờ xác nhận</Link>),
    //   children: `Content of Tab Pane 1`,
  },
  {
    key: '1',
    label: (<Link className='active'>Đặt thành công</Link>),
    //   children: `Content of Tab Pane 2`,
  },
  {
    key: '2',
    label: (<Link style={{ color: 'black' }} to={'/order/ongoing'}>Đang diễn ra</Link>),
    //   children: `Content of Tab Pane 3`,
  },
  {
    key: '3',
    label: (<Link style={{ color: 'black' }} to={'/order/complete'}>Đã hoàn thành</Link>),
    // children: `Content of Tab Pane 3`,
  },
  {
    key: '4',
    label: (<Link style={{ color: 'black' }} to={'/order/cancel'}>Đã hủy</Link>),
    // children: `Content of Tab Pane 3`,
  },
];
let listRoomId = new Map();
let listRoomNumber = new Map();
let listRoom = [];

const ConfirmContainer = React.memo(() => {
  const update = useSelector((state) => state.reloadConfirm)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [reload, setReload] = useState(false);
  const [form] = Form.useForm();

  const [checkIn, setCheckin] = useState('');
  const [checkOut, setCheckout] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // const [listOrderDetail, setListOrderDetail] = useState('')

  const [allowAdd, setAllowAdd] = useState(false);

  useEffect(() => {
    if(allowAdd === true) {
      const currentDate = new Date();
      const dmy = checkIn.split('-');
      const checkinDate = new Date(dmy[1]+"-"+dmy[0]+"-"+dmy[2]);
      const dmy2 = checkOut.split('-');
      if(checkinDate.getTime() - currentDate.getTime() < -1000*60*60*7) {
        message.warning("Ngày nhận không hợp lệ");
        setAllowAdd(false);
        return;
      }
      if(checkIn === checkOut) {
        message.warning("Bạn phải ở tối thiểu 1 ngày");
        setAllowAdd(false);
        return;
      }
      axios({
        method: 'GET',
        url: Constants.host + "/api/v1/hotels/authorization",
        headers: {
          'Authorization': localStorage.getItem('authorization'),
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        const id = res.data.data.id;
        axios({
          method: 'GET',
          url: Constants.host+ `/api/v1/room-type/hotel/${id}`,
          params: {
            'checkin': dmy[2]+'-'+dmy[1]+'-'+dmy[0],
            'checkout': dmy2[2]+'-'+dmy2[1]+'-'+dmy2[0]
          }
        })
        .then((res) => {
          listRoom = res.data.data;
        })
        .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowAdd])

  const setDate = (value) => {
    if(value === null) {
      setAllowAdd(false);
      setCheckin('');
      setCheckout('');
      form.resetFields();
      return
    }
    if (value[0] !== undefined && value[1] !== undefined) {
      setAllowAdd(true);
      setCheckin(value[0].$D + '-' + (value[0].$M + 1) + '-' + value[0].$y);
      setCheckout(value[1].$D + '-' + (value[1].$M + 1) + '-' + value[1].$y);
    }
  }
  const onClickClear = () => {
    form.resetFields();
    setAllowAdd(false);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsConfirm(true)
  };
  const handleCancel = () => {
    setIsCancel(true)
  };
  const handleOkConfirm = () => {
    if (checkIn !== '' && checkOut !== '') {
      addRoom();
      setIsModalOpen(false)
      setIsConfirm(false)
      form.resetFields()
      setAllowAdd(false);
      message.success('Thêm đơn mới thành công')
      setReload(!reload)
    } else {
      message.error('Đơn không hợp lệ')
    }
  };
  const handleCancelConfirm = () => {
    setIsConfirm(false);
  };
  const handleOkCancel = () => {
    listRoomId.clear();
    listRoomNumber.clear();
    form.resetFields();
    setAllowAdd(false);
    setIsCancel(false);
    setIsModalOpen(false);
  };
  const handleCancelCancel = () => {
    setIsCancel(false)
  };

  useEffect(() => {
    setReload(!reload)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  const changeRoomType = (key, value) => {
    listRoomId.set(key, value)
  }
  const changeNumber = (key, value) => {
    listRoomNumber.set(key, value)
  }
  const deleteRoom = (key) => {
    listRoomId.delete(key);
    listRoomNumber.delete(key)
  }
  const addRoom = () => {
    axios({
      method: 'GET',
      url: Constants.host+'/api/v1/hotels/authorization',
      headers: {
        'Authorization': localStorage.getItem('authorization'),
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      const dmy = checkIn.split('-');
      const dmy2 = checkOut.split('-');
      const listOrder = [];
      listRoomId.forEach((value, key) => {
        if(listRoomNumber.get(key) !== undefined) {
          listOrder.push({roomId: value, quantity: listRoomNumber.get(key)})
        }
      })
      axios({
        method: 'POST',
        url: Constants.host+'/api/v1/order',
        data: {
          'checkin': dmy[2]+'-'+dmy[1]+'-'+dmy[0],
          'checkout': dmy2[2]+'-'+dmy2[1]+'-'+dmy2[0],
          'name': name,
          'phone': phone,
          'userId': res.data.data.userId,
          'hotelId': res.data.data.id,
          'orderDetails': listOrder
        }
      })
    })
    .catch(err => console.log(err))
    // const listOrder = [];
    // listRoomId.forEach((value, key) => {
    //   if(listRoomNumber.get(key) !== undefined) {
    //     listOrder.push({roomId: value, number: listRoomNumber.get(key)})
    //   }
    // })
  }
  
  return (
    <Content style={styleSheet.content}>
      <Tabs
        defaultActiveKey="1" type='line'
        tabBarExtraContent={
          <div>
            <Button
              style={{ marginRight: 8 }}
              icon={<PlusOutlined />}
              type="primary"
              onClick={showModal}>
              Thêm đơn mới
            </Button>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              style={{ marginRight: 32 }}
              onClick={() => { setReload(!reload) }}>
              Tải lại trang
            </Button>
          </div>
        }
        items={items2} size='large' style={{ marginLeft: 32 }} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableCom status={Constants.STATUS.COMFIRM} reload={reload} />
      </div>

      <Modal
        title="Thêm đơn 'đã xác nhận'" open={isModalOpen}
        onCancel={handleCancel}
        width={480}
        footer={[
          <Button key='back' icon={<CloseOutlined />} danger onClick={handleCancel}>Hủy</Button>,
          <Button key='' icon={<DeleteOutlined />} style={{backgroundColor: '#faad14', color: 'white'}} onClick={() => {onClickClear()}}>Xóa</Button>,
          <Button key='submit' icon={<PlusOutlined />} type="primary" onClick={handleOk}>Thêm</Button>
        ]}
      >
        <Form
          form={form}
        >
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Form.Item name='date' style={{ display: 'flex' }} rules={[{required: true, message: 'Chọn ngày là bắt buộc'}]}>
              <RangePicker
                placeholder={["Ngày nhận phòng", "Ngày trả phòng"]}
                style={{width: 432}}
                format="DD-MM-YYYY"
                
                onChange={(value) => {setDate(value) }} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Form.Item name='name' rules={[{required: true, message: 'Họ tên không được bỏ trống !'}]}>
              <Input 
                placeholder='Họ và tên' 
                prefix={<UserOutlined style={{ color: Colors.bgBetween }} />} 
                style={{ width: 240 }} 
                onChange={(value) => {setName(value.target.value)}}
              />
            </Form.Item>
            <Form.Item name='phone' rules={[{required: true, message: 'Số điện thoại không được bỏ trống !'}]}>
              <Input 
                placeholder='Số điện thoại' 
                prefix={<PhoneOutlined style={{ color: Colors.bgBetween }} />} 
                style={{ width: 180 }} 
                onChange={(value) => {setPhone(value.target.value)}}
              />
            </Form.Item>
          </div>
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'first']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing first name',
                        },
                      ]}
                    >
                      <Select placeholder="Chọn loại phòng" onChange={(data) => changeRoomType(key, data)} style={{ width: 300, maxWidth: 300 }}>
                        {listRoom.map((data) => (
                          <Select.Option key={data.id} value={data.id}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                              <div style={{display: 'flex', flex: 10}}>{data.name}</div>
                              <div style={{display: 'flex', flex: 1}}>còn: {data.quantity}</div>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <InputNumber min={1} placeholder='Số phòng' onChange={(data) => changeNumber(key, data)}/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => {remove(key); deleteRoom(key)}} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" disabled={!allowAdd} onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm loại phòng
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      <Modal
        title="Bạn có đồng ý thêm đơn mới ?" open={isConfirm}
        onCancel={handleCancelConfirm}
        footer={[
          <Button key='back' danger onClick={handleCancelConfirm}>Hủy</Button>,
          <Button key='submit' type="primary" onClick={handleOkConfirm}>Đồng ý</Button>
        ]}
      />

      <Modal
        title="Bạn muốn hủy đơn ?" open={isCancel}
        onCancel={handleCancelCancel}
        footer={[
          <Button key='back' danger onClick={handleCancelCancel}>Hủy</Button>,
          <Button key='submit' type="primary" onClick={handleOkCancel}>Đồng ý</Button>
        ]}
      />
    </Content>
  );
});

const styleSheet = {
  content: {
    margin: '8px 0 8px',
    minHeight: 520,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
  },
};


export default ConfirmContainer;