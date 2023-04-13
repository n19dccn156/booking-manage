import {
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

import Colors from '../../Constants/Colors';
import '../../index.css';
import { Link } from 'react-router-dom';
import TableCom from '../../Components/OrderComponent/Table';
import Constants from '../../Constants/Constants';
import { useSelector } from 'react-redux';
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
    label: (<Link className='active'>Đang diễn ra</Link>),
    //   children: `Content of Tab Pane 3`,
  },
  {
    key: '3',
    label: (<Link style={{color: 'black'}} to={'/order/complete'}>Đã hoàn thành</Link>),
    // children: `Content of Tab Pane 3`,
  },
  {
    key: '4',
    label: (<Link style={{color: 'black'}} to={'/order/cancel'}>Đã hủy</Link>),
    // children: `Content of Tab Pane 3`,
  },
];

const OngoingContainer = () => {
  const update = useSelector((state) => state.reloadOngoing)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setReload(!reload)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  return (
    <Content style={styleSheet.content}>
      <Tabs
        defaultActiveKey="2" type='line'
        tabBarExtraContent={
          <div>
            {/* <Button 
              style={{ marginRight: 8 }} 
              icon={<PlusOutlined />}
              type="primary" 
              onClick={() => {console.log('insert')}}>
              Thêm đơn mới
            </Button> */}
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
        <TableCom status={Constants.STATUS.ONGOING} reload={reload}/>
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


export default OngoingContainer;;