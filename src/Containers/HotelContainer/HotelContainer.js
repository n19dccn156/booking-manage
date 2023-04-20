import { AimOutlined, BankOutlined, FormOutlined, LoginOutlined, LogoutOutlined, PhoneOutlined, CloseCircleOutlined, UploadOutlined, SaveOutlined, StarOutlined } from "@ant-design/icons";
import { Badge, Button, Image, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import Colors from "../../Constants/Colors";
import FacilitiesContainer from "./FacilitiesContainer";
import DescriptionContainer from "./DescriptionContainer";
import axios from "axios";
import Constants from "../../Constants/Constants";

const object = {
  id: '',
  name: '',
  avatar: '',
  address: '',
  phone: '',
  rating: '',
  checkin: '',
  checkout: '',
  lat: '',
  lon: '',
  active: '',
  userId: ''
}

const HotelContainer = () => {
  // const [checked, setChecked] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const [hotelOrigin, setHotelOrigin] = useState(object);

  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [address, setAddress] = useState('');
  const [urlBase64, setUrlBase64] = useState('');

  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const chooseAvatar = (image) => {
    if (image.status === "uploading") return;
    if (image.status === "error") {
      // Get this url from response in real world.
      getBase64(image.originFileObj, (imageUrl) => {
        setUrlBase64(imageUrl);
      });
    }
    setIsUpdate(true);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ có thể là file JPG/PNG !");
      return false;
    }
    return true;
  }

  const clickUpdate = () => {
    let base64 = hotelOrigin.avatar;
    if(urlBase64 !== '') base64 = urlBase64.split(',')[1];
    axios({
      method: 'PATCH',
      url: Constants.host+'/api/v1/hotels',
      headers: {
        Authorization: localStorage.getItem('authorization')
      },
      data: {
        "id": parseInt(hotelOrigin.id),
        "name": name,
        "avatar": base64,
        "address": address,
        "phone": phone,
        "rating": rating,
        "checkin": checkin,
        "checkout": checkout,
        "lat": parseFloat(lat),
        "lon": parseFloat(lon),
        "active": active,
        "userId": parseInt(hotelOrigin.userId)
      }
    })
    .then((res) => {
      console.log(res.data)
      const data = res.data.data;
      const hotel = object;

      hotel.id = data.id;
      hotel.name = data.name;
      hotel.phone = data.phone;
      hotel.avatar = data.avatar;
      hotel.address = data.address;

      hotel.rating = data.rating;
      hotel.checkin = data.checkin;
      hotel.checkout = data.checkout;
      hotel.lat = data.lat;
      hotel.lon = data.lon;

      hotel.active = data.active;
      hotel.userId = data.userId;

      setHotelOrigin(hotel);
      setIsUpdate(false);
    })
    .catch((err) => {
      console.log(err.response)
    })
  }
  const clickChange = () => {
    setIsUpdate(true);
  }
  const clickCancel = () => {
    setName(hotelOrigin.name);
    setAddress(hotelOrigin.address);
    setAvatar(Constants.host+hotelOrigin.avatar);
    setActive(hotelOrigin.active);

    setPhone(hotelOrigin.phone);
    setRating(hotelOrigin.rating);
    setCheckin(hotelOrigin.checkin);
    setCheckout(hotelOrigin.checkout);
    setLon(hotelOrigin.lon);
    setLat(hotelOrigin.lat);

    setIsUpdate(false);
  }
  useEffect(() => {
    axios({
      method: 'GET',
      url: Constants.host+'/api/v1/hotels/authorization',
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    })
    .then((res) => {
      const data = res.data.data;
      const hotel = object;

      hotel.id = data.id;
      hotel.name = data.name;
      hotel.phone = data.phone;
      hotel.avatar = data.avatar;
      hotel.address = data.address;

      hotel.rating = data.rating;
      hotel.checkin = data.checkin;
      hotel.checkout = data.checkout;
      hotel.lat = data.lat;
      hotel.lon = data.lon;

      hotel.active = data.active;
      hotel.userId = data.userId;

      setName(data.name);
      setAddress(data.address);
      setAvatar(Constants.host+data.avatar);
      setActive(data.active);

      setPhone(data.phone);
      setRating(data.rating);
      setCheckin(data.checkin);
      setCheckout(data.checkout);
      setLon(data.lon);
      setLat(data.lat);

      setHotelOrigin(hotel);
    })
    .catch((err) => {
      message.error(err.response.message)
    })
  }, [])

  const btnUpdate = (<Button style={{ marginLeft: 24 }} type='primary' icon={<SaveOutlined />} onClick={() => clickUpdate()}>Cập nhật</Button>);
  const btnChange = (<Button style={{ marginLeft: 24 }} type='primary' icon={<FormOutlined />} onClick={() => clickChange()}>Thay đổi</Button>);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: Colors.bgAbove }}>
      <div style={{ display: 'flex', flex: 2, flexDirection: 'column', padding: 16 }}>
        <Image style={{ display: 'flex', borderRadius: 4 }} src={urlBase64 === '' ? avatar : urlBase64} />

        <div style={{ display: 'flex', position: 'absolute', flexDirection: 'row' }}>
          <Upload style={{ maxWidth: 50, maxHeight: 50 }} name="logo" beforeUpload={beforeUpload} listType="picture" onChange={(data) => chooseAvatar(data.fileList[0])}>
            <Button type='primary' style={{backgroundColor: '#722ed1'}} icon={<UploadOutlined />}>Thay đổi ảnh đại diện</Button>
          </Upload>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <div style={{ display: 'flex', flex: 2.8, justifyContent: 'space-around', alignItems: 'center', fontWeight: 'bold' }}>
            {active ? 
              <><Badge status='processing' color='green' text='Đang hoạt động'/></> : 
              <><Badge status='processing' color='red' text='Dừng hoạt động'/></>}
          </div>
          {isUpdate ? btnUpdate : btnChange}
          <Button style={{ marginLeft: 8 }} type='primary' danger icon={<CloseCircleOutlined/>} disabled={!isUpdate} onClick={() => clickCancel()}>Xóa</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 5 }} prefix={<BankOutlined style={{ color: '#bfbfbf' }} />} value={name} disabled={!isUpdate} onChange={(data) => setName(data.target.value)}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 5 }} prefix={<AimOutlined style={{ color: '#bfbfbf' }} />} value={address} disabled={!isUpdate} onChange={(data) => setAddress(data.target.value)}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 1, marginRight: 16 }} prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />} value={phone} disabled={!isUpdate} onChange={(data) => setPhone(data.target.value)}/>
          <Input style={{ display: 'flex', flex: 1 }} prefix={<StarOutlined style={{ color: '#bfbfbf' }} />} value={rating} disabled={true} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 1, marginRight: 16 }} prefix={<LoginOutlined style={{ color: '#bfbfbf' }} />} value={checkin} disabled={!isUpdate} onChange={(data) => setCheckin(data.target.value)}/>
          <Input style={{ display: 'flex', flex: 1 }} prefix={<LogoutOutlined style={{ color: '#bfbfbf' }} />} value={checkout} disabled={!isUpdate} onChange={(data) => setCheckout(data.target.value)}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 1, marginRight: 16 }} prefix={<AimOutlined style={{ color: '#bfbfbf' }} />} value={lat} disabled={!isUpdate} onChange={(data) => setLat(data.target.value)}/>
          <Input style={{ display: 'flex', flex: 1 }} prefix={<AimOutlined style={{ color: '#bfbfbf' }} />} value={lon} disabled={!isUpdate} onChange={(data) => setLon(data.target.value)}/>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 3, flexDirection: 'column' }}>
        <FacilitiesContainer/>
        <DescriptionContainer/>
      </div>
    </div>
  );
}

export default HotelContainer;