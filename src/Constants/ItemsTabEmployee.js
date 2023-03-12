import {
  HomeOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const ItemsTabEmployee = [
	{
		label: (<NavLink to={'/employee'}  className='nav-link'>QL khách sạn</NavLink>),
		key: '0',
		icon: <HomeOutlined />,
	},
];

export default ItemsTabEmployee;