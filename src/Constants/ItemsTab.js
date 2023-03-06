import {
  DashboardOutlined,
  HomeOutlined,
  LineChartOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';

const ItemsTab = [
	{
		label: (<Link to={'/'}>Tổng quan</Link>),
		key: '0',
		icon: <DashboardOutlined />,
	},
	{
		label: (<NavLink to={'/order/await'}>QL đơn đặt</NavLink>),
		key: '1',
		icon: <ProfileOutlined />,
	},
	{
		label: (<NavLink to={'/hotel'}>QL khách sạn</NavLink>),
		key: '2',
		icon: <HomeOutlined />,
	},
	{
		label: (<Link to={'/room'}>QL phòng</Link>),
		key: '3',
		icon: <HomeOutlined />,
	},
	{
		label: (<Link to={'/statistic'}>Thống kê</Link>),
		key: '4',
		icon: <LineChartOutlined />,
	}
];


export default ItemsTab;