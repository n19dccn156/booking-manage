import React, { useState } from 'react';

import { Layout, Menu } from 'antd';
import Colors from "../../Constants/Colors";
import '../../index.css';
import ItemsTab from '../../Constants/ItemsTab';
import HeaderContainer from '../../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../../Containers/CoreContainer/FooterContainer';
import HotelContainer from '../../Containers/HotelContainer/HotelContainer';
import RoomContainer from '../../Containers/HotelContainer/RoomContainer';
const { Sider, Content } = Layout;

const HotelPage = React.memo(() => {
  const [current, setCurrent] = useState('2');

  const clickTab = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: Colors.bgBelow }} hasSider>
      <Sider theme='dark' width={180} style={{overflow: 'auto', position: 'fixed', height: '100vh'}} >
        <div className="logo"></div>
        <Menu theme="dark" onClick={clickTab} selectedKeys={[current]} mode='inline' items={ItemsTab} />
      </Sider>
      <div style={{ display: 'flex', flex: 5, flexDirection: 'column', marginLeft: 180, justifyContent: 'left' }}>
        <HeaderContainer />
        <Content style={styleSheet.content}>
          <HotelContainer/>
          <RoomContainer/>
        </Content>
        <FooterContainer />
      </div>
    </Layout>
  );
}
)

const styleSheet = {
  avatar: {
    backgroundColor: "transparent",
    color: "#0958d9",
    fontSize: 24,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 0 0 16px',
    minHeight: 550,
    borderRadius: 8,
    // backgroundColor: Colors.bgAbove,
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

export default HotelPage;