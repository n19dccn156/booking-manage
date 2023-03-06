import React, { useState } from 'react';

import { Layout, Menu } from 'antd';
import '../../index.css';
import ItemsTab from '../../Constants/ItemsTab';
import Colors from '../../Constants/Colors';
const { Sider } = Layout;

const SiderContainer = (currentTab) => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(currentTab.currentTab);
  console.log(current);
  const clickTab = (e) => {
    setCurrent(e.key);
  };

  return (
    // <Layout style={{ backgroundColor: Colors.bgBelow }}>
      <Sider theme='dark' style={styleSheet.sider} trigger={null} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo"></div>
        <Menu theme="dark" onClick={clickTab} selectedKeys={[current]} mode="inline" items={ItemsTab} />
      </Sider>
    // </Layout>
  );
}

const styleSheet = {
  sider: {
    margin: '16px 16px 32px',
    minHeight: 640,
    borderRadius: 8,
  },
}

export default SiderContainer;