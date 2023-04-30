import React from 'react'
import { Layout, Menu } from 'antd';
import { ItemsTabAdmin } from '../../Constants/ItemsTab';
import Colors from '../../Constants/Colors';
import HeaderContainer from '../../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../../Containers/CoreContainer/FooterContainer';
import TableHotelComponent from '../../Components/Admin/TableHotelComponent';
const { Sider, Content} = Layout;

const HotelManagePage = () => {
  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: Colors.bgBelow }}>
      <Sider theme='dark' width={180} style={{overflow: 'auto', position: 'fixed', height: '100vh'}}>
        <div className="logo"></div>
        <Menu theme="dark" selectedKeys={['5']} mode='inline' items={ItemsTabAdmin} />
      </Sider>
      <div style={{ display: 'flex', flex: 5, flexDirection: 'column', justifyContent: 'left', marginLeft: 180 }}>
        <HeaderContainer />
        <Content style={styleSheet.content}>
          <TableHotelComponent/>
        </Content>
        <FooterContainer/>
      </div>
    </Layout>
  )
}

const styleSheet = {
  content: {
    margin: "16px 0 8px 16px",
    minHeight: 520,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
  },
};

export default HotelManagePage;
