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
import React, { useState } from 'react';

// import TableComponent from '../../Components/OrderComponent/TableComponent';
import Colors from '../../Constants/Colors';
import '../../index.css'
import { Link } from 'react-router-dom';
import TableCom from '../../Components/OrderComponent/Table';
import Constants from '../../Constants/Constants';
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

const ComfirmContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComfirm, setIsComfirm] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [reload, setReload] = useState(false);
  const [form] = Form.useForm();

  const [checkIn, setCheckin] = useState('');
  const [checkOut, setCheckout] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [allowAdd, setAllowAdd] = useState(false);

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
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsComfirm(true)
  };
  const handleCancel = () => {
    setIsCancel(true)
  };
  const handleOkComfirm = () => {
    if (checkIn !== '' && checkOut !== '') {
      console.log(checkIn);
      console.log(checkOut);
      console.log(name);
      console.log(phone);
      setIsModalOpen(false)
      setIsComfirm(false)
      form.resetFields()
    } else {
      message.error('Đơn không hợp lệ')
    }
  };
  const handleCancelComfirm = () => {
    setIsComfirm(false);
  };
  const handleOkCancel = () => {
    setIsCancel(false)
    setIsModalOpen(false)
  };
  const handleCancelCancel = () => {
    setIsCancel(false)
  };

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
                style={{ width: 300 }} 
                onChange={(value) => {setName(value.target.value)}}
              />
            </Form.Item>
            <Form.Item name='phone' rules={[{required: true, message: 'Số điện thoại không được bỏ trống !'}]}>
              <Input 
                placeholder='Số điện thoại' 
                prefix={<PhoneOutlined style={{ color: Colors.bgBetween }} />} 
                style={{ width: 120 }} 
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
                      <Select placeholder="Chọn loại phòng" style={{ width: 300, maxWidth: 300 }}>
                        <Select.Option value="1 giuong">Phòng 1 giường</Select.Option>
                        <Select.Option value="2 giuong">Phòng 2 giường</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <InputNumber min={1} max={10} placeholder='Số phòng' />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
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
        title="Bạn có đồng ý thêm đơn mới ?" open={isComfirm}
        onCancel={handleCancelComfirm}
        footer={[
          <Button key='back' danger onClick={handleCancelComfirm}>Hủy</Button>,
          <Button key='submit' type="primary" onClick={handleOkComfirm}>Đồng ý</Button>
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
};

const styleSheet = {
  content: {
    margin: '8px 0 8px',
    minHeight: 520,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
  },
};


export default ComfirmContainer;