import React from 'react';

import { Layout } from 'antd';
import SiderContainer from '../../Containers/CoreContainer/SiderContainer';
import HeaderContainer from '../../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../../Containers/CoreContainer/FooterContainer';
import Colors from '../../Constants/Colors';

const HotelPage = () => {
  return (
    <Layout style={{ backgroundColor: Colors.bgBelow }}>
      <SiderContainer currentTab='2'/>
      <Layout className="site-layout" style={{ backgroundColor: Colors.bgBelow }}>
        <HeaderContainer/>
        <FooterContainer/>
      </Layout>
    </Layout>
  );
}

export default HotelPage;