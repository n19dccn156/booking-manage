import React, { useState } from 'react';

import {
	ArrowRightOutlined,
	ArrowLeftOutlined,
	BellOutlined,
	SearchOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Space, Badge, Avatar, Col, Row, Button } from 'antd';
import Search from 'antd/es/input/Search';
import { Layout } from 'antd';
import '../../index.css';

const { Header } = Layout;

const HeaderContainer = () => {
	const [collapsed, setCollapsed] = useState(false);
	console.log('render Header')
	return (
		<Header style={styleSheet.header}>
			<div style={styleSheet.search}>
				<Search placeholder="input search text" prefix={<SearchOutlined />} enterButton={"Search"} />
			</div>
			<div style={styleSheet.bell}>
				<Space style={{paddingRight: 16}}>
					<Badge count={1}>
						<Avatar style={{backgroundColor: '#3c89e8'}} shape='square' icon={<BellOutlined />} />
					</Badge>
				</Space>
				<Space>
					<Avatar style={{backgroundColor: '#3c89e8'}} shape='square' icon={<SettingOutlined />} />
				</Space>
			</div>
			{/* <div style={styleSheet.setting}>
				<Space>
					<Avatar style={{backgroundColor: '#3c89e8'}} shape='square' icon={<SettingOutlined />} />
				</Space>
			</div> */}
			<div style={styleSheet.avatar}>
				<Button>{"Nguyễn Sang".substring(0, 15) + "..."}</Button>
				<Avatar shape='circle' src="https://joesch.moe/api/v1/random" />
			</div>
		</Header>
	)
}

const styleSheet = {
	header: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 16,
		borderBottomLeftRadius: 8,
		backgroundColor: '#f0f0f0',
	},
	search: {
		display: 'flex', 
		flex: 3, 
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bell: {
		display: 'flex', 
		flex: 1, 
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	setting: {
		display: 'flex', 
		flex: 1, 
		alignItems: 'center',
		justifyContent: 'between',
	}, 
	avatar: {
		display: 'flex', 
		flex: 1, 
		alignItems: 'center',
		justifyContent: 'flex-end',
	}
};


export default HeaderContainer;