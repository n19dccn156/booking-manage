import React, { useState } from 'react';

import { InboxOutlined, SaveOutlined, UserOutlined, AuditOutlined, CalendarOutlined, MailOutlined, PhoneOutlined, KeyOutlined } from "@ant-design/icons";
import { Layout, Menu, Image, Typography, Upload, Button, Input } from 'antd';
import Colors from "../../Constants/Colors";
import '../../index.css';
import ItemsTab from '../../Constants/ItemsTab';
import HeaderContainer from '../../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../../Containers/CoreContainer/FooterContainer';
const { Sider, Content } = Layout;
const { Title } = Typography;

const AccountPage = () => {
  const [current, setCurrent] = useState('6');

  const clickTab = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: Colors.bgBelow }}>
      <Sider theme='dark' width={180} style={{overflow: 'auto', position: 'fixed', height: '100vh'}}>
        <div className="logo"></div>
        <Menu theme="dark" onClick={clickTab} selectedKeys={[current]} mode='inline' items={ItemsTab} />
      </Sider>
      <div style={{ display: 'flex', flex: 5, flexDirection: 'column', justifyContent: 'left', marginLeft: 180 }}>
        <HeaderContainer />
        <Content style={styleSheet.content}>
          <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', margin: '0 32px 0 32px'}}>
            <Title level={4} style={{color: '#001d66', fontWeight: 'bold'}}>Ảnh đại diện<Button danger type='primary' icon={<SaveOutlined />} style={{marginLeft: 32}} disabled>Cập nhật</Button></Title>
            <div style={{border: '1px solid', marginBottom: 16}}></div>
            <Image style={{display: 'flex', flex: 7, borderRadius: 4 }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKmfwesfRNM7vLBp0rTjWpBBrZIkgi856UZw&usqp=CAU' />
            <div style={{display: 'flex', flex: 1, flexDirection: 'column', marginTop: 16, marginBottom: 32}}>
              <Upload type='drag' name="files" action="/upload.do" style={{backgroundColor: Colors.bgBelow}}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Chọn hoặc kéo hình ở đây</p>
                <p className="ant-upload-hint">Chỉ được chọn 1 hình</p>
              </Upload>
            </div>
          </div>
          <div style={{display: 'flex', flex: 2, flexDirection: 'column', justifyContent: 'center', margin: '0 32px 0 32px'}}>
            <Title level={4} style={{color: '#001d66', fontWeight: 'bold'}}>Thông tin cá nhân<Button danger type='primary' icon={<SaveOutlined />} style={{marginLeft: 32}} disabled>Cập nhật</Button></Title>
            <div style={{border: '1px solid'}}></div>
            
            <div style={{display: 'flex', flex: 7, flexDirection: 'column'}}>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <p style={{flex: 1, fontSize: 20, marginRight: 16}}>Mã tài khoản</p>
                <p style={{flex: 1, fontSize: 20, marginLeft: 16}}>Quyền hạn</p>
              </div>
              <div style={{display: 'flex', flex: 3, flexDirection: 'row'}}>
                <Input prefix={<UserOutlined />} size='large' value='192389403743' style={{maxHeight: 50, marginRight: 16}} disabled/>
                <Input prefix={<KeyOutlined />}  size='large' value='Quản trị khách sạn' style={{maxHeight: 50, marginLeft: 16}} disabled/>
              </div>
            </div>

            <div style={{display: 'flex', flex: 7, flexDirection: 'column', justifyContent: 'center'}}>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <p style={{flex: 1, fontSize: 20, marginRight: 16}}>Họ</p>
                <p style={{flex: 1, fontSize: 20, marginLeft: 16}}>Tên</p>
              </div>
              <div style={{display: 'flex', flex: 2, flexDirection: 'row'}}>
                <Input prefix={<UserOutlined />} size='large' defaultValue='Nguyễn Thanh' style={{maxHeight: 50, marginRight: 16}}/>
                <Input prefix={<UserOutlined />} size='large' defaultValue='Sang' style={{maxHeight: 50, marginLeft: 16}}/>
              </div>
            </div>

            <div style={{display: 'flex', flex: 7, flexDirection: 'column', justifyContent: 'center'}}>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <p style={{flex: 1, fontSize: 20, marginRight: 16}}>Số điện thoại</p>
                <p style={{flex: 1, fontSize: 20, marginLeft: 16}}>Email</p>
              </div>
              <div style={{display: 'flex', flex: 2, flexDirection: 'row'}}>
                <Input prefix={<PhoneOutlined />} size='large' defaultValue='0334428102' style={{maxHeight: 50, marginRight: 16}}/>
                <Input prefix={<MailOutlined />} size='large' defaultValue='sangdoannguyen7@gmail.com' style={{maxHeight: 50, marginLeft: 16}}/>
              </div>
            </div>

            <div style={{display: 'flex', flex: 7, flexDirection: 'column', justifyContent: 'center', marginBottom: 32}}>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <p style={{flex: 1, fontSize: 20, marginRight: 16}}>Ngày sinh</p>
                <p style={{flex: 1, fontSize: 20, marginLeft: 16}}>Giới tính</p>
              </div>
              <div style={{display: 'flex', flex: 2, flexDirection: 'row'}}>
                <Input prefix={<CalendarOutlined />} size='large' defaultValue='24/01/2001' style={{maxHeight: 50, marginRight: 16}}/>
                <Input prefix={<AuditOutlined />} size='large' defaultValue='Nam' style={{maxHeight: 50, marginLeft: 16}}/>
              </div>
            </div>
            
          </div>
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
    display: 'flex',
    flexDirection: 'row',
    margin: '16px 0 0 16px',
    minHeight: 500,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
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

export default AccountPage;