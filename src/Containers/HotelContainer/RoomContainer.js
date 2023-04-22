import { BankOutlined, FieldNumberOutlined, NumberOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Image, Input, Modal, Upload, message } from "antd";
import RoomComponent from "../../Components/HotelComponent/RoomComponent";
import Colors from "../../Constants/Colors";
import { useEffect, useState } from "react";
import axios from "axios";
import Constants from "../../Constants/Constants";

const RoomContainer = () => {

  const [listRoom, setListRoom] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [avatar, setAvatar] = useState('');

  const clickAdd = () => {
    const pri = price.replace(/,/g, '');
    if(avatar.length < 100) {
      message.error('Hãy chọn hình');
      return;
    }
    axios({
      method: 'POST',
      url: Constants.host+'/api/v1/room-type',
      headers: {
        Authorization: localStorage.getItem('authorization')
      },
      data: {
        "name": name,
        "quantity": quantity,
        "price": pri,
        "avatar": avatar.split(',')[1]
      }
    })
    .then((res) => {
      message.success(res.data.message);
      setAddSuccess(!addSuccess);
    })
    .catch((err) => {
      message.error(err.response.data.message);
    })
    setIsOpen(false);
  }

  const clickClose = () => {

    setIsOpen(false);
  }


  const formatMoney = (value) => {
    let data = value.replace(/,/g, '');
    setPrice(data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ có thể là file JPG/PNG !");
      return false;
    }
    return true;
  }
  const ChooseAvatar = (image) => {
    if (image.status === "uploading") return;
    if (image.status === "error") {
      // Get this url from response in real world.
      getBase64(image.originFileObj, (imageUrl) => {
        setAvatar(imageUrl);
      });
    }
  }
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: Constants.host+'/api/v1/room-type/hotel',
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    })
    .then((res) => {
      setListRoom(res.data.data);
    })
    .catch((err) => {
      message.error(err.response.message);
    })
  }, [addSuccess])  

  return (
    <div style={{ display: 'flex', backgroundColor: Colors.bgAbove, flexDirection: 'column', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, marginTop: 16 }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '16px 16px 0 16px' }}>
        <div style={{ fontWeight: 'bold', fontSize: 16, color: '#001d66' }}>
          Danh sách phòng
          <Button style={{ marginLeft: 24 }} type='primary' icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>Thêm</Button>
        </div>
        <div style={{ border: '1px solid rgb(0, 29, 102)', marginTop: 8 }}></div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          listRoom.map(value => (
            <Col key={value.id} span={12}><RoomComponent room={ value }/></Col>
          ))
        }
      </div>
      <Modal 
        title='Thêm phòng' 
        okText='Thêm phòng'
        cancelText='Hủy'
        open={isOpen}
        onCancel={clickClose}
        onOk={clickAdd}>
          <div style={{ display: 'flex', margin: '16px 0 32px 16px', backgroundColor: '#f5f5f5', borderRadius: 5 }}>
            {avatar === '' ?
            (<></>)
            :
            (<Image style={{ display: 'flex', flex: 1, maxWidth: 200, height: 200, borderRadius: 5, margin: '8px 0 8px 8px' }} src={avatar} />)}
            
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px', justifyContent: 'space-evenly' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, marginLeft: 16 }}>
                <Input style={{ display: 'flex', flex: 5, fontSize: 16 }} prefix={<BankOutlined style={{ color: '#bfbfbf' }} />} placeholder="Tên phòng" disabled={!true} value={name} onChange={(data) => setName(data.target.value)}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, marginLeft: 16 }}>
                <Input style={{ display: 'flex', flex: 3, fontSize: 16 }} prefix={<FieldNumberOutlined style={{ color: '#bfbfbf' }} />}  placeholder="Số lượng" value={quantity} onChange={(data) => setQuantity(data.target.value)}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, marginLeft: 16 }}>
                <Input style={{ display: 'flex', flex: 3, fontSize: 16 }} prefix={<NumberOutlined style={{ color: '#bfbfbf' }} />} placeholder="Giá" value={price} onChange={(data) => formatMoney(data.target.value)}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, marginLeft: 16}}>
                <Upload style={{display: 'flex', flex: 1, maxHeight: 50 }} name="logo" beforeUpload={beforeUpload} onChange={(image) => ChooseAvatar(image.fileList[0])}>
                  <Button type='primary' style={{backgroundColor: '#08979c', width: 220 }} icon={<UploadOutlined />} >Chọn hình</Button>
                </Upload>
              </div>
            </div>
          </div>
        </Modal>
    </div>
  );
}

export default RoomContainer;