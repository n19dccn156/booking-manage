import {
  DashboardOutlined,
  HomeOutlined,
  LineChartOutlined,
  ProfileOutlined,
	LogoutOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';

const ItemsTab = [
	{
		label: (<Link to={'/'} className='nav-link'>Tổng quan</Link>),
		key: '0',
		icon: <DashboardOutlined />,
	},
	{
		label: (<NavLink to={'/order/await'}  className='nav-link'>QL đơn đặt</NavLink>),
		key: '1',
		icon: <ProfileOutlined />,
	},
	{
		label: (<NavLink to={'/hotel'}  className='nav-link'>QL khách sạn</NavLink>),
		key: '2',
		icon: <HomeOutlined />,
	},
	{
		label: (<Link to={'/statistic'}  className='nav-link'>Thống kê</Link>),
		key: '4',
		icon: <LineChartOutlined />,
	},
	{
		label: (<Link to={'/account'}  className='nav-link'>Tài khoản</Link>),
		key: '6',
		icon: <UserOutlined />,
	},
	{
		label: (<Link to={'/logout'}  className='nav-link'>Đăng xuất</Link>),
		key: '7',
		icon: <LogoutOutlined />,
	}
];

export default ItemsTab;