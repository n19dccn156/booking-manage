import React from 'react';
import { Layout } from 'antd';
import SiderContainer from '../../Containers/CoreContainer/SiderContainer';
import HeaderContainer from '../../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../../Containers/CoreContainer/FooterContainer';
import Colors from '../../Constants/Colors';
import ChartContainer from '../../Containers/HomeContainer/ChartContainer';
import StatusContainer from '../../Containers/HomeContainer/StatusContainer';
import '../../index.css';

const { Content } = Layout;

const DashboardPage = () => {
  return (
    <Layout style={{ backgroundColor: Colors.bgBelow }}>
      <SiderContainer currentTab='0'/>
      <Layout className="site-layout" style={{ backgroundColor: Colors.bgBelow }}>
        <HeaderContainer/>
        <Content style={styleSheet.content}>
          <StatusContainer />
          <ChartContainer />
        </Content>
        <FooterContainer/>
      </Layout>
    </Layout>
  );
}

const styleSheet = {
  content: {
    margin: '16px 16px 0 8px',
    minHeight: 520,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
};

export default DashboardPage;