import React from 'react'
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from 'antd';

const FacilitiesContainer = () => {
  return (
    <div>
        <div style={{ display: 'flex', flex: 2, padding: '16px 16px', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold', fontSize: 16, color: '#001d66' }}>
              Danh sách tiện ích
              <Button style={{marginLeft: 24}} type='primary' icon={<PlusOutlined/>}>Thêm</Button>
            </div>
            <div style={{border: '1px solid rgb(0, 29, 102)', marginTop: 8 }}></div>
          </div>
          <div style={{ display: 'flex', flex: 4, flexDirection: 'column', marginTop: 16 }}>
            <Space style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <Tag closable closeIcon={<CloseCircleFilled/>} style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag closable closeIcon={<CloseCircleFilled/>} style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag closable closeIcon={<CloseCircleFilled/>} style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag closable closeIcon={<CloseCircleFilled/>} style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
            </Space>
            <Space style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
            </Space>
            <Space style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
            </Space>
            <Space style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
              <Tag style={{ display: 'flex', width: 120, height: 30, fontSize: 24, justifyContent: 'center' }} color="magenta">magenta</Tag>
            </Space>
          </div>
        </div>
    </div>
  )
}

export default FacilitiesContainer;
