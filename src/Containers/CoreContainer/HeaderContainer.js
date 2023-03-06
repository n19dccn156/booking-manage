import React, { useState } from 'react';

import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  BellOutlined,
  SearchOutlined,
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
		// <div>
			<Header style={styleSheet.header}>
				<Row style={{display: 'flex'}}>
					<Col span={2} style={styleSheet.columnPanel}>
						{React.createElement(
							collapsed ? ArrowRightOutlined : ArrowLeftOutlined, 
							{className: 'trigger', onClick: () => setCollapsed(!collapsed)}
						)}
					</Col>
					<Col span={12} style={styleSheet.column}>
						<Search placeholder="input search text" prefix={<SearchOutlined />} enterButton={"Search"}/>
					</Col>
					<Col span={2} push={3} style={styleSheet.column}>
						<Space>
							<Badge count={1}>
								<Avatar style={styleSheet.avatar} shape='square' icon={<BellOutlined />} />
							</Badge>
						</Space>
					</Col>
					<Col span={4} push={3} style={styleSheet.column}>
						<Button>{"Nguyễn Sang".substring(0, 15) + "..."}</Button>
					</Col>
					<Col span={4} style={styleSheet.column}>
						<Avatar shape='circle' src="https://joesch.moe/api/v1/random" />
					</Col>
				</Row>
			</Header>
		// </div>
	)
}

const styleSheet = {
	header: {
		margin: '16px 16px 0 8px', 
		borderRadius: 8, 
		backgroundColor: '#f0f0f0',
	},
	columnPanel: { 
		display: "flex", 
		alignItems: "center", 
		justifyContent: "flex-start",
	},
	column: { 
		display: "flex", 
		alignItems: "center", 
		justifyContent: "flex-end",
	},
	avatar: {
    backgroundColor: "transparent", 
    color: "#0958d9", 
    fontSize: 24,
  },
};
  

export default HeaderContainer;