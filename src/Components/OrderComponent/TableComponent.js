import {
  DownOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Space, Table, message } from 'antd';
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    align: 'center',
    backgroundColor: 'red',
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: 'Ngày nhận',
    dataIndex: 'checkin',
    align: 'center',
  },
  {
    title: 'Ngày trả',
    dataIndex: 'checkout',
    align: 'center',
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    align: 'center',
  },
  {
    title: 'Xử lý',
    dataIndex: 'action',
    align: 'center',
    render: () => (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button type='primary'>Chi tiết</Button>
          <Dropdown menu={menuProps} arrow={{ pointAtCenter: true }}>
            <Button type='dashed'>
              <Space>Trạng thái<DownOutlined /></Space>
            </Button>
          </Dropdown>
          {/* <Button style={{backgroundColor: '#f5222d', color: 'white'}}>Hủy</Button> */}
        </div>
      </>
    ),
  }
];
const data = [
  {
    key: '0',
    stt: '1',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '1',
    stt: '2',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '2',
    stt: '3',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '3',
    stt: '4',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '4',
    stt: '5',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '5',
    stt: '6',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '6',
    stt: '7',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '7',
    stt: '8',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '8',
    stt: '9',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '9',
    stt: '10',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
  {
    key: '10',
    stt: '11',
    name: 'John Brown',
    phone: '0334428102',
    checkin: '24-08-2001',
    checkout: '16-07-2001',
    time: '14-12-2000 23:12:00',
  },
];

const items = [
  {
    label: 'Xác nhận',
    key: '1',
  },
  {
    label: 'Nhận phòng',
    key: '2',
  },
  {
    label: 'Trả phòng',
    key: '3',
  },
  {
    label: 'Hủy',
    key: '4',
    danger: true,
    //   disabled: true,
  },
];
const handleMenuClick = (e) => {
  message.info('Click on menu item.');
};
const menuProps = {
  items,
  onClick: handleMenuClick,
};


const TableComponent = () => {
  return (
    <>
      {/* <Divider>Small size table</Divider> */}
      <Table columns={columns} dataSource={data} scroll={true} size="small" pagination={{ defaultPageSize: 7, responsive: true }} style={{ width: '95%' }} bordered={true} />
    </>
  );
}
export default TableComponent;
