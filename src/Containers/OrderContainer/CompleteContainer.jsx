import {
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Tabs } from 'antd';
import React from 'react';

import TableComponent from '../../Components/OrderComponent/TableComponent';
import Colors from '../../Constants/Colors';
import '../../index.css';
import { Link } from 'react-router-dom';
const { Content } = Layout;

const onChange = (key) => {
  console.log(key);
};

const items2 = [
  {
    key: '0',
    label: (<Link style={{color: 'black'}} to={'/order/await'}>Chờ xác nhận</Link>),
    //   children: `Content of Tab Pane 1`,
  },
  {
    key: '1',
    label: (<Link style={{color: 'black'}} to={'/order/comfirm'}>Đặt thành công</Link>),
    //   children: `Content of Tab Pane 2`,
  },
  {
    key: '2',
    label: (<Link style={{color: 'black'}} to={'/order/ongoing'}>Đang diễn ra</Link>),
    //   children: `Content of Tab Pane 3`,
  },
  {
    key: '3',
    label: (<Link to={'/order/complete'}>Đã hoàn thành</Link>),
    // children: `Content of Tab Pane 3`,
  },
  {
    key: '4',
    label: (<Link style={{color: 'black'}} to={'/order/cancel'}>Đã hủy</Link>),
    // children: `Content of Tab Pane 3`,
  },
];


const element = (
  <div>
    <Button style={{ marginRight: 8 }} type="primary">Thêm đơn mới</Button>
    <Button
      type="primary"
      icon={<ReloadOutlined />}
      style={{ marginRight: 32 }}
    //   onClick={}
    />
  </div>
);

const CompleteContainer = () => {

  return (
    <Content style={styleSheet.content}>
      <Tabs defaultActiveKey="3" type='line' tabBarExtraContent={element} items={items2} size='large' style={{ marginLeft: 32 }} onChange={onChange} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableComponent />
      </div>
    </Content>
  );

};

const styleSheet = {
  content: {
    margin: '8px 16px 8px 8px',
    minHeight: 520,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
  },
};


export default CompleteContainer;