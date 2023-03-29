import React from 'react';

import {
	BellOutlined,
	SearchOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Space, Badge, Avatar, Button } from 'antd';
import Search from 'antd/es/input/Search';
import { Layout } from 'antd';
import '../../index.css';
import { useEffect } from 'react';

const { Header } = Layout;

const HeaderContainer = React.memo(() => {
	return (
		<Header style={styleSheet.header}>
			<div style={styleSheet.search}>
				<Search placeholder="input search text" prefix={<SearchOutlined />} enterButton={"Search"} />
			</div>
			<div style={styleSheet.bell}>
				<Space style={{paddingRight: 16}}>
					<Avatar style={{backgroundColor: '#3c89e8'}} shape='square' icon={<SettingOutlined />} />
				</Space>
				<Space>
					<Badge count={1}>
						<Avatar style={{backgroundColor: '#3c89e8'}} shape='square' icon={<BellOutlined />} />
					</Badge>
				</Space>
			</div>
			<div style={styleSheet.avatar}>
				<Button type='text'>{"Nguyễn Sang Thanh".length < 15 ? "Nguyễn Sang Thanh" : "Nguyễn Sang Thanh".substring(0, 15)+"..."}</Button>
				{/* <Avatar shape='circle' src="https://joesch.moe/api/v1/random" /> */}
				<Avatar shape='circle' src="https://avatars.dicebear.com/api/bottts/stefan.svg" />
			</div>
		</Header>
	)
});

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
}


export default HeaderContainer;