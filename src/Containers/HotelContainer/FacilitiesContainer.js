import React, { useEffect, useState } from 'react'
import { 
  CloseCircleFilled, 
  PlusOutlined,
 } from "@ant-design/icons";
import { Button, Checkbox, Modal, Space, Tag, message } from 'antd';
import axios from 'axios';
import Constants from '../../Constants/Constants';

const color = ['magenta', 'red', 'volcano', 'orange', 'gold', 
              'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']

const FacilitiesContainer = (props) => {

  const [reLoad, setReload] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isInsert, setIsInsert] = useState(false);
  const [title, setTitle] = useState('');
  const [idDelete, setIdDelete] = useState('');
  const [items, setItems] = useState([]);
  const [itemsAdd, setItemsAdd] = useState([]);
  

  const clickItem = (checkedValue) => {
    setItemsAdd(checkedValue);
  }
  const clickInsert = () => {
    axios({
      method: 'GET',
      url: Constants.host+`/api/v1/facilities/hotel/find/${props.id}`
    })
    .then((res) => {
      setItems(res.data.data)
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
    setIsInsert(true);
  }
  const clickDelete = (data) => {
    setTitle("Xóa '" + data.name + "' ?");
    setIdDelete(data.facilitiesId);
    setIsDelete(true);
  }
  const clickOkInsert = () => {
    axios({
      method: 'POST',
      url: Constants.host+'/api/v1/facilities',
      headers: {
        Authorization: localStorage.getItem('authorization')
      },
      data: {
        "ids": itemsAdd
      }
    })
    .then((res) => {
      message.success('Thêm thành công !!')
      setItemsAdd([]);
      setIsInsert(false);
      setReload(!reLoad);
    })
    .catch((err) => {
      message.error(err.response.data.message)
    })
  }
  const clickOkDelete = () => {
    axios({
      method: 'DELETE',
      url: Constants.host+'/api/v1/facilities/' + parseInt(idDelete),
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    })
    .then((res) => {
      message.success('Xóa thành công !!')
      setIsDelete(false);
      setReload(!reLoad);
    })
    .catch((err) => {
      message.error(err.response.data.message)
    })
  }
  const clickCancelInsert = () => {
    setIsInsert(false);
  }
  const clickCancelDelete = () => {
    setIsDelete(false);
  }
  useEffect(() => {
    axios({
      method: 'GET',
      url: Constants.host+'/api/v1/facilities/hotel/'+props.id
    })
    .then((res) => {
      setFacilities(res.data.data);
    })
    .catch((err) => {
      message.error(err.response.data.message)
    })
  }, [reLoad, props.id])

  return (
    <div>
        <div style={{ display: 'flex', flex: 2, padding: '16px 16px', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold', fontSize: 16, color: '#001d66' }}>
              Danh sách tiện ích
              <Button style={{marginLeft: 24}} type='primary' icon={<PlusOutlined/>} onClick={clickInsert}>Thêm</Button>
            </div>
            <div style={{border: '1px solid rgb(0, 29, 102)', marginTop: 8 }}></div>
          </div>
          <div style={{ display: 'flex', flex: 4, flexDirection: 'column', marginTop: 16 }}>
            <Space style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
              {facilities.length > 0 ? 
              (facilities.map((data, index) => (
                <Tag 
                  key={index} 
                  closable 
                  closeIcon={<CloseCircleFilled style={{fontSize: 16}} key={data.iconWeb} onClick={() => clickDelete(data)}/>} 
                  style={{ display: 'flex', height: 40, fontSize: 18, justifyContent: 'center', alignItems: 'center' }} 
                  color={color[index % color.length]}>
                    {data.name}
                </Tag>
              )))
              :
              (<></>)
              }
            </Space>
          </div>
        </div>
        <Modal 
          title={title} 
          open={isDelete} 
          okText='Đồng ý'
          cancelText='Hủy'
          onOk={clickOkDelete} 
          onCancel={clickCancelDelete}/>

        <Modal 
          title='Thêm tiện ích' 
          open={isInsert} 
          okText='Thêm'
          cancelText='Hủy'
          onOk={clickOkInsert} 
          onCancel={clickCancelInsert}>
            <Checkbox.Group 
              style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}
              onChange={clickItem}>
              {items.length > 0 ?
                (items.map((data, index) => (
                  <Checkbox key={index} value={data.id}>{data.name}</Checkbox>
                )))
                :
                (<>Không còn tiện ích để thêm !!!</>)
              }
            </Checkbox.Group>
        </Modal>

    </div>
  )
}

export default FacilitiesContainer;
