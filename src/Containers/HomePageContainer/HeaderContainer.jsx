import { Avatar, Badge, Button, Dropdown, Image, Space } from 'antd'
import React from 'react'
import logo from '../../Asset/Img/logo.jpg';
import avatar from '../../Asset/Img/avatar.png';
import { BellOutlined, DownOutlined, ExceptionOutlined, IdcardOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';

const items = [
    {
        label: (<Link to={'/account'}>Tài khoản</Link>),
        key: '1',
        icon: <IdcardOutlined />,
        
    },
    {
        label: (<Link to={'/history'}>Đơn đặt</Link>),
        key: '2',
        icon: <ExceptionOutlined />,
    },
    {
        label: localStorage.getItem('authorization')?.length ?? 0 > 7 ? (<Link to={'/logout'}>Đăng xuất</Link>) : (<Link to={'/login'}>Đăng nhập</Link>),
        key: '3',
        icon: localStorage.getItem('authorization')?.length ?? 0 > 7 ? (<LogoutOutlined />) : (<LoginOutlined />),
    },
]

const menuProps = {
    items,
};

const HeaderContainer2 = () => {
    const navigate = useNavigate();

  return (
    // <div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <div style={{display: 'flex', flex: 1}}>
            <Image 
                src={logo} 
                preview={false} 
                onClick={() => navigate('/home')}/>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'space-evenly', marginRight: 32}}>
            <Badge count={9}>
                <Avatar style={{backgroundColor: '#3c89e8'}} shape='square' icon={<BellOutlined />} />
            </Badge>   
            <Avatar src={avatar} style={{marginLeft: 60}}/>
            <Dropdown menu={menuProps}>
                <Button>
                    <Space>
                        {'Thanh Sang'.length > 10 ? 'Thanh Sang'.substring(0, 10) + '...' : 'Thanh Sang'}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
      </div>
    // </div>
  )
}

export default HeaderContainer2
