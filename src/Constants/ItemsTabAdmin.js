import {
  HomeOutlined,
} from '@ant-design/icons';

import { NavLink } from 'react-router-dom';
const ItemsTabAdmin = [
	{
		label: (<NavLink to={'/admin'}  className='nav-link'>QL khách sạn</NavLink>),
		key: '0',
		icon: <HomeOutlined />,
	},
];

export default ItemsTabAdmin;