import React, { useState } from 'react';

// import {
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
//   BellOutlined,
//   SearchOutlined,
// } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Layout, Menu, Row, Space } from 'antd';
// import Search from 'antd/es/input/Search';
// import { Navigate, Route, Routes } from 'react-router-dom';
import Colors from "../Constants/Colors";
import '../index.css';
import ItemsTab from '../Constants/ItemsTab';
import { useSelector } from 'react-redux';
import StatusContainer from '../Containers/HomeContainer/StatusContainer';
import ChartContainer from '../Containers/HomeContainer/ChartContainer';
import HeaderContainer from '../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../Containers/CoreContainer/FooterContainer';
const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('0');
  // const loggedIn = useSelector((state) => state.loggedIn);
  // console.log(loggedIn)
  // console.log(current)
  // console.log(collapsed.valueOf)
  
  const clickTab = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout style={{display: 'flex', flexDirection:'row', backgroundColor: Colors.bgBelow }}>
      {/* <HeaderContainer/> */}
      <Sider collapsible theme='dark' style={{flex: 1}} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo"></div>
          <Menu theme="dark" onClick={clickTab} selectedKeys={[current]} mode='inline' items={ItemsTab} />
        </Sider>
      <div style={{display: 'flex', flex: 5, flexDirection: 'column'}}>
         <HeaderContainer/>
         <Content style={styleSheet.content}>
          <StatusContainer />
          <ChartContainer />
        </Content>
        <FooterContainer/>
      </div>

      {/* <FooterContainer/> */}
    </Layout>
  );
}

const styleSheet = {
  sider: {
    // margin: '8px 8px 8px',
    // minHeight: 550,
    borderRadius: 8,
    flex: 1,
  },
  header: {
    margin: '0px 8px 0 8px',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  columnPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  column: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatar: {
    backgroundColor: "transparent",
    color: "#0958d9",
    fontSize: 24,
  },
  content: {
    margin: '16px 0 0 16px',
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

export default App;