import React, { useState } from 'react';

import { Layout, Menu } from 'antd';
import Colors from "../../../Constants/Colors";
import '../../../index.css';
import ItemsTab from '../../../Constants/ItemsTab';
import HeaderContainer from '../../../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../../../Containers/CoreContainer/FooterContainer';
import AwaitContainer from '../../../Containers/OrderContainer/AwaitContainer';
const { Sider, Content } = Layout;

const OrderAwaitPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('1');
  const clickTab = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: Colors.bgBelow }}>
      <Sider collapsible theme='dark' collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo"></div>
        <Menu theme="dark" onClick={clickTab} selectedKeys={[current]} mode='inline' items={ItemsTab} />
      </Sider>
      <div style={{ display: 'flex', flex: 5, flexDirection: 'column', justifyContent: 'left' }}>
        <HeaderContainer />
        <Content style={styleSheet.content}>
          <AwaitContainer />
        </Content>
        <FooterContainer />
      </div>
    </Layout>
  );
}

const styleSheet = {
  avatar: {
    backgroundColor: "transparent",
    color: "#0958d9",
    fontSize: 24,
  },
  content: {
    margin: '8px 0 0 8px',
    // minHeight: 550,
    borderRadius: 8,
    backgroundColor: "transparent",
    flex: 6
  },
  footer: {
    margin: '0px 8px 0px 8px',
    textAlign: "center",
    fontSize: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  }
}

export default OrderAwaitPage;