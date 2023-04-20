import React from 'react'
import { FormOutlined } from "@ant-design/icons";
import { Button, Input } from 'antd';


const DescriptionContainer = () => {
  return (
    <div>
      <div style={{ display: 'flex', flex: 3, padding: '16px 16px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div style={{ fontWeight: 'bold', fontSize: 16, color: '#001d66' }}>
            Nội dung mô tả
            <Button style={{ marginLeft: 24 }} type='primary' icon={<FormOutlined />}>Thay đổi</Button>
          </div>
          <div style={{ border: '1px solid rgb(0, 29, 102)', marginTop: 8 }}></div>
        </div>
        <Input.TextArea style={{ display: 'flex', flex: 4, paddingBottom: 16 }} defaultValue='Desciption' />
      </div>
    </div>
  )
}

export default DescriptionContainer;
