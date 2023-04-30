import { BankOutlined, FieldNumberOutlined, FormOutlined, NumberOutlined, CloseOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { Badge, Button, Image, Input, Switch, Upload, message } from "antd";
import Constants from "../../Constants/Constants";
import { useState } from "react";
import axios from "axios";

const RoomComponent = (props) => {

  const [isUpdate, setIsUpdate] = useState(false);
  const [roomOrigin, setRoomOrigin] = useState(props.room);
  const [urlBase64, setUrlBase64] = useState('');

  const [name, setName] = useState(props.room.name);
  const [price, setPrice] = useState(String(props.room.price).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  const [avatar, setAvatar] = useState(props.room.avatar);
  const [active, setActive] = useState(props.room.active);
  const [quantity, setQuantity] = useState(props.room.quantity);

  const clickSwitch = (checked) => {
    setActive(checked);
  }
  const clickChange = () => {
    setIsUpdate(true);
  }
  const clickUpdate = () => {
    let avt = avatar;
    let pri = parseFloat(price.replace(/,/g, ''));
    if(urlBase64 !== '') avt = urlBase64.split(',')[1];
    axios({
      method: 'PATCH',
      url: Constants.host+`/api/v1/room-type`,
      headers: {
        Authorization: localStorage.getItem('authorization')
      },
      data: {
        "id": parseInt(roomOrigin.id),
        "name": name,
        "avatar": avt,
        "quantity": parseInt(quantity),
        "price": pri,
        "active": active,
        "hotelId": 0
      }
    })
    .then((res) => {
      console.log(res.data.data)
      setUrlBase64('');
      setRoomOrigin(res.data.data);

      message.success(res.data.message);
      setIsUpdate(false);
    })
    .catch((err) => {
      console.log(err.response)
      message.error(err.response.message)
    })
  }
  const clickCancel = () => {
    setName(roomOrigin.name);
    setQuantity(roomOrigin.quantity);
    setPrice(String(roomOrigin.price).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setAvatar(roomOrigin.avatar);
    setActive(roomOrigin.active);

    setUrlBase64('');
    setIsUpdate(false);
  }
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ có thể là file JPG/PNG !");
      return false;
    }
    return true;
  }
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const formatMoney = (value) => {
    let data = value.replace(/,/g, '');
    setPrice(data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  const ChooseAvatar = (image) => {
    if (image.status === "uploading") return;
    if (image.status === "error") {
      // Get this url from response in real world.
      getBase64(image.originFileObj, (imageUrl) => {
        setUrlBase64(imageUrl);
      });
    }

    setIsUpdate(true);
  }
  
  return (
    <div style={{ display: 'flex', margin: '16px 0 32px 16px', backgroundColor: '#fafafa', borderRadius: 5 }}>
      <Image style={{ display: 'flex', flex: 1, maxWidth: 200, height: 200, borderRadius: 5, margin: '8px 0 8px 8px' }} src={urlBase64 === '' ? Constants.host + avatar ?? '/api/v1/images/1' : urlBase64} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px', justifyContent: 'space-evenly' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flex: 2.8, alignItems: 'center', fontWeight: 'bold', justifyContent: 'space-around' }}>
            {active === true ? 
            (
              <>
                <Badge status='processing' color='green' text='Đang hoạt động'/>
                <Switch style={{ marginLeft: 32, backgroundColor: '#52c41a' }} unCheckedChildren="Đóng" checkedChildren="Mở" checked={active} disabled={!isUpdate} onChange={clickSwitch}/>
              </>
            )
            :
            (
              <>
                <Badge status='processing' color='red' text='Ngừng hoạt động' />
                <Switch style={{ marginLeft: 32 }} unCheckedChildren="Đóng" checkedChildren="Mở" checked={active} disabled={!isUpdate} onChange={clickSwitch}/>
              </>
            )
            }
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, marginLeft: 16 }}>
          <Input style={{ display: 'flex', flex: 5, fontSize: 16 }} prefix={<BankOutlined style={{ color: '#bfbfbf' }} />} disabled={!isUpdate} value={name ?? ''} onChange={value => setName(value.target.value)} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, marginLeft: 16 }}>
          <Input style={{ display: 'flex', flex: 3, fontSize: 16 }} prefix={<FieldNumberOutlined style={{ color: '#bfbfbf' }} />} disabled={!isUpdate} value={quantity ?? '1'} onChange={value => setQuantity(value.target.value)} />
          <Input style={{ display: 'flex', flex: 5, fontSize: 16, marginLeft: 8 }} prefix={<NumberOutlined style={{ color: '#bfbfbf' }} />} disabled={!isUpdate} value={price} onChange={value => formatMoney(value.target.value)} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, paddingLeft: 8, justifyContent: 'space-around' }}>
          <Upload style={{display: 'flex', flex: 1, maxHeight: 50 }} name="logo" beforeUpload={beforeUpload} onChange={(data) => {ChooseAvatar(data.fileList[0])}}>
            <Button type='primary' style={{backgroundColor: '#08979c' }} icon={<UploadOutlined />} >Chọn hình</Button>
          </Upload>
          {isUpdate ? 
            (<Button type='primary' icon={<SaveOutlined />} onClick={clickUpdate}>Cập nhật</Button>)
            :
            (<Button type='primary' icon={<FormOutlined />} onClick={() => clickChange()}>Thay Đổi</Button>)
          }
          <Button danger type='primary' icon={<CloseOutlined />} onClick={() => clickCancel()} disabled={!isUpdate}>Hủy</Button>
        </div>
      </div>
    </div>
  );
}

export default RoomComponent;