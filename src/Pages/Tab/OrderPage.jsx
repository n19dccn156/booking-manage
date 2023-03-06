import {
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Tabs } from 'antd';
import React from 'react';

import TableComponent from '../../Components/OrderComponent/TableComponent';
import Colors from '../../Constants/Colors';
import '../../index.css';
import { Link } from 'react-router-dom';

import SiderContainer from '../../Containers/CoreContainer/SiderContainer';
import HeaderContainer from '../../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../../Containers/CoreContainer/FooterContainer';

const { Content } = Layout;

const onChange = (key) => {
  console.log(key);
};

const items2 = [
  {
    key: '0',
    label: (<Link style={{color: 'black'}} to={'/order/await'}>Chờ xác nhận</Link>),
  },
  {
    key: '1',
    label: (<Link style={{color: 'black'}} to={'/order/comfirm'}>Đặt thành công</Link>),
  },
  {
    key: '2',
    label: (<Link style={{color: 'black'}} to={'/order/ongoing'}>Đang diễn ra</Link>),
  },
  {
    key: '3',
    label: (<Link style={{color: 'black'}} to={'/order/complete'}>Đã hoàn thành</Link>),
  },
  {
    key: '4',
    label: (<Link style={{color: 'black'}} to={'/order/cancel'}>Đã hủy</Link>),
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

const OrderPage = () => {
  return (
    <Layout style={{ backgroundColor: Colors.bgBelow }}>
      <SiderContainer currentTab='1'/>
      <Layout className="site-layout" style={{ backgroundColor: Colors.bgBelow }}>
        <HeaderContainer/>
        <Content style={styleSheet.content}>
          <Tabs defaultActiveKey="0" tabBarExtraContent={element} items={items2} size='large' style={{ marginLeft: 32}} onChange={onChange} />
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <TableComponent />
          </div>
        </Content>
        <FooterContainer/>
      </Layout>
    </Layout>
  );
}

const styleSheet = {
  content: {
    margin: '16px 16px 16px 8px',
    minHeight: 520,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
  }
}

export default OrderPage;
