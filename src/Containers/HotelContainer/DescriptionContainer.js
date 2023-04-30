import React, { useEffect, useState } from 'react'
import { CloseOutlined, FormOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Input, message } from 'antd';
import axios from 'axios';
import Constants from '../../Constants/Constants';

const DescriptionContainer = () => {

  const [isUpdate, setIsUpdate] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionOrigin, setDescriptionOrigin] = useState('');

  useEffect(() => {
    axios({
      method: 'GET',
      url: Constants.host+'/api/v1/hotels/description',
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    })
    .then((res) => {
      setDescription(res.data.data);
      setDescriptionOrigin(res.data.data);
    })
    .catch((err) => {
      message.error(err.response.message)
    })
  }, [])

  const clickChange = () => { 
    setIsUpdate(true);
  }

  const clickUpdate = () => {
    axios({
      method: 'PATCH',
      url: Constants.host+'/api/v1/hotels/description',
      headers: {
        Authorization: localStorage.getItem('authorization')
      },
      params: {
        description: description
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.response.data)
    })
    setIsUpdate(false);
    setDescriptionOrigin(description);
  }

  const clickCancel = () => {
    setDescription(descriptionOrigin);
    setIsUpdate(false);
  }

  const btnUpdate = (<Button style={{ marginLeft: 24 }} type='primary' icon={<SaveOutlined />} onClick={() => clickUpdate()}>Cập nhật</Button>);
  const btnChange = (<Button style={{ marginLeft: 24 }} type='primary' icon={<FormOutlined />} onClick={() => clickChange()}>Thay đổi</Button>);
  return (
    // <div>
      <div style={{ display: 'flex', flex: 3, padding: '16px 16px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div style={{ fontWeight: 'bold', fontSize: 16, color: '#001d66' }}>
            Nội dung mô tả
            {isUpdate ? btnUpdate : btnChange}
            <Button style={{ marginLeft: 24 }} type='primary' icon={<CloseOutlined />} disabled={!isUpdate} danger onClick={() => clickCancel()}>Hủy</Button>
          </div>
          <div style={{ border: '1px solid rgb(0, 29, 102)', marginTop: 8 }}></div>
        </div>
        {isUpdate ? 
          <><Input.TextArea style={{ display: 'flex', flex: 4, paddingBottom: 16, backgroundColor: '#fff1b8' }} disabled={!isUpdate} value={description} onChange={(data) => setDescription(data.target.value)}/></>
          :
          <><Input.TextArea style={{ display: 'flex', flex: 4, paddingBottom: 16 }} disabled={!isUpdate} value={description} onChange={(data) => setDescription(data.target.value)}/></>}
      </div>
    // </div>
  )
}

export default DescriptionContainer;
