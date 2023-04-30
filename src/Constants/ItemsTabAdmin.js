import {
	HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
const ItemsTabAdmin = [
	{
		label: (<Link to={'/admin'}  className='nav-link'>QL khách sạn</Link>),
		key: '0',
		icon: <HomeOutlined />,
	},
	{
		label: (<Link to={'/account'}  className='nav-link'>Tài khoản</Link>),
		key: '6',
		icon: <UserOutlined />,
	},
];

export default ItemsTabAdmin;