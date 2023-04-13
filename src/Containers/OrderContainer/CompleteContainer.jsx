import {
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Tabs } from 'antd';
import React, { useState } from 'react';

import Colors from '../../Constants/Colors';
import '../../index.css';
import { Link } from 'react-router-dom';
import TableCom from '../../Components/OrderComponent/Table';
import Constants from '../../Constants/Constants';
const { Content } = Layout;

const items2 = [
  {
    key: '0',
    label: (<Link style={{color: 'black'}} to={'/order/await'}>Chờ xác nhận</Link>),
    //   children: `Content of Tab Pane 1`,
  },
  {
    key: '1',
    label: (<Link style={{color: 'black'}} to={'/order/confirm'}>Đặt thành công</Link>),
    //   children: `Content of Tab Pane 2`,
  },
  {
    key: '2',
    label: (<Link style={{color: 'black'}} to={'/order/ongoing'}>Đang diễn ra</Link>),
    //   children: `Content of Tab Pane 3`,
  },
  {
    key: '3',
    label: (<Link className='active'>Đã hoàn thành</Link>),
    // children: `Content of Tab Pane 3`,
  },
  {
    key: '4',
    label: (<Link style={{color: 'black'}} to={'/order/cancel'}>Đã hủy</Link>),
    // children: `Content of Tab Pane 3`,
  },
];

const CompleteContainer = () => {
  const [reload, setReload] = useState(false)
  return (
    <Content style={styleSheet.content}>
      <Tabs
        defaultActiveKey="3" type='line'
        tabBarExtraContent={
          <div>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              style={{ marginRight: 32 }}
              onClick={() => { setReload(!reload) }}>
              Tải lại trang
            </Button>
          </div>
        }
        items={items2} size='large' style={{ marginLeft: 32 }} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableCom status={Constants.STATUS.COMPLETE} reload={reload}/>
      </div>
    </Content>
  );
};

const styleSheet = {
  content: {
    margin: '8px 0 8px',
    minHeight: 520,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
  },
};


export default CompleteContainer;