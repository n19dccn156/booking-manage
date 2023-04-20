import React, { useEffect, useState } from 'react';

import { InboxOutlined, SaveOutlined, UserOutlined, AuditOutlined, CalendarOutlined, MailOutlined, PhoneOutlined, KeyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Layout, Menu, Image, Typography, Upload, Button, Input, message } from 'antd';
import Colors from "../../Constants/Colors";
import '../../index.css';
import ItemsTab from '../../Constants/ItemsTab';
import HeaderContainer from '../../Containers/CoreContainer/HeaderContainer';
import FooterContainer from '../../Containers/CoreContainer/FooterContainer';
import axios from 'axios';
import Constants from '../../Constants/Constants';
const { Sider, Content } = Layout;
const { Title } = Typography;

const userObject = {
  id: '',
  avatar: '',
  role: '',
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  birthday: '',
  gender: '',
}

const AccountPage = () => {
  const [isUpdateImage, setIsUpdateImage] = useState(false);
  const [isUpdateInfo, setIsUpdateInfo] = useState(false);
  const [user, setUser] = useState(userObject);
  const [avatar, setAvatar] = useState('');
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [urlBase64, setUrlBase64] = useState('');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const chooseImage = (image) => {
    if (image.status === "uploading") return;
    if (image.status === "error") {
      // Get this url from response in real world.
      getBase64(image.originFileObj, (imageUrl) => {
        setUrlBase64(imageUrl);
      });
    }
    setIsUpdateImage(true);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ có thể là file JPG/PNG !");
      return false;
    }
    return true;
  }

  const clearUpdateImage = () => {
    setIsUpdateImage(false);
    setUrlBase64('');
  }

  const clearUpdateInfo = () => {
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setPhone(user.phone);
    setEmail(user.email);
    setBirthday(user.birthday);
    setGender(user.gender);

    setIsUpdateInfo(false);
  }

  useEffect(() => {
    // call api
    axios({
      method: 'GET',
      url: Constants.host+'/api/v1/users',
      headers: {
        'Authorization': localStorage.getItem('authorization'),
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      userObject.avatar = Constants.host + res.data.data.avatar;
      userObject.id = res.data.data.id;
      userObject.role = res.data.data.roleId;

      userObject.firstname = res.data.data.firstname;
      userObject.lastname = res.data.data.lastname;
      userObject.phone = res.data.data.phone;
      userObject.email = res.data.data.email;
      userObject.birthday = res.data.data.birthday;
      userObject.gender = res.data.data.gender;

      setUser(userObject);

      setAvatar(Constants.host + res.data.data.avatar);
      setId(res.data.data.id);
      setRole(res.data.data.roleId);

      setFirstName(res.data.data.firstname);
      setLastName(res.data.data.lastname);
      setPhone(res.data.data.phone);
      setEmail(res.data.data.email);
      setBirthday(res.data.data.birthday);
      setGender(res.data.data.gender);

      setIsUpdateInfo(false);
      setIsUpdateImage(false);
    })
    .catch(err => {})
  }, [])

  const updateInfo = () => {

    axios({
      method: 'PATCH',
      url: Constants.host+"/api/v1/users",
      headers: {
        Authorization: localStorage.getItem('authorization'),
        'Content-Type': 'application/json'
      },
      data: {
        "firstname": firstName,
        "lastname": lastName,
        "phone": phone,
        "email": email,
        "birthday": birthday,
        "gender": gender
      }
    })
    .then((res) => {
      const data = res.data.data;
      const usr = user;

      usr.firstname = data.firstName; 
      usr.lastname = data.lastname; 
      usr.email = data.email; 
      usr.phone = data.phone; 
      usr.birthday = data.birthday; 
      usr.gender = data.gender; 

      setUser(usr);
      setIsUpdateInfo(false);
    })
    .catch((err) => {
      message.err(err.response.data.message)
    })
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const updateAvatar = () => {
    axios({
      method: 'PATCH',
      url: Constants.host+'/api/v1/users/avatar/base64',
      headers: {
        Authorization: localStorage.getItem('authorization'),
        'Content-Type': 'application/json'
      },
      params: {
        urlAvatarOld: avatar,
        urlBase64: urlBase64.split(',')[1]
      }
    })
    .then((res) => {
      const url = Constants.host+res.data.data;
      const usr = user;
      usr.avatar = url;
      setAvatar(url);
      setUser(usr);
      setIsUpdateImage(false);
      message.success(res.data.message);
    })
    .catch((err) => {
      message.error(err.response.message);
    })
  }

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: Colors.bgBelow }}>
      <Sider theme='dark' width={180} style={{overflow: 'auto', position: 'fixed', height: '100vh'}}>
        <div className="logo"></div>
        <Menu theme="dark" selectedKeys={['6']} mode='inline' items={ItemsTab} />
      </Sider>
      <div style={{ display: 'flex', flex: 5, flexDirection: 'column', justifyContent: 'left', marginLeft: 180 }}>
        <HeaderContainer />
        <Content style={styleSheet.content}>
          <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', margin: '0 32px 0 32px'}}>
            <Title level={4} style={{color: '#001d66', fontWeight: 'bold'}}>
              Ảnh đại diện
              <Button type='primary' icon={<SaveOutlined />} style={{marginLeft: 24}} disabled={!isUpdateImage} onClick={() => updateAvatar()}>Cập nhật</Button>
              <Button danger type='primary' icon={<DeleteOutlined />} style={{marginLeft: 20}} disabled={!isUpdateImage} onClick={() => clearUpdateImage()}>Xóa</Button>
            </Title>
            <div style={{border: '1px solid', marginBottom: 16}}></div>
            {urlBase64 === '' ? (
              <Image style={{display: 'flex', flex: 7, borderRadius: 4 }} src={avatar} />
            ) : (
              <Image style={{display: 'flex', flex: 7, borderRadius: 4 }} src={urlBase64} />
            )}
            {/* <Image style={{display: 'flex', flex: 7, borderRadius: 4 }} src={avatar} /> */}
            <div style={{display: 'flex', flex: 1, flexDirection: 'column', marginTop: 16, marginBottom: 32}}>
              <Upload type='drag' name="file" 
                style={{backgroundColor: Colors.bgBelow}} 
                beforeUpload={beforeUpload} 
                onChange={data => chooseImage(data.fileList[0])}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Chọn hoặc kéo hình ở đây</p>
                <p className="ant-upload-hint">Chỉ được chọn 1 hình</p>
              </Upload>
            </div>
          </div>
          <div style={{display: 'flex', flex: 2, flexDirection: 'column', justifyContent: 'center', margin: '0 32px 0 32px'}}>
            <Title level={4} style={{color: '#001d66', fontWeight: 'bold'}}>
              Thông tin cá nhân
              <Button type='primary' icon={<SaveOutlined />} style={{marginLeft: 24}} disabled={!isUpdateInfo} onClick={() => updateInfo()}>Cập nhật</Button>
              <Button danger type='primary' icon={<DeleteOutlined />} style={{marginLeft: 20}} disabled={!isUpdateInfo} onClick={() => clearUpdateInfo()}>Xóa</Button>
            </Title>
            <div style={{border: '1px solid'}}></div>
            
            <div style={{display: 'flex', flex: 7, flexDirection: 'column'}}>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <p style={{flex: 1, fontSize: 20, marginRight: 16}}>Mã tài khoản</p>
                <p style={{flex: 1, fontSize: 20, marginLeft: 16}}>Quyền hạn</p>
              </div>
              <div style={{display: 'flex', flex: 3, flexDirection: 'row'}}>
                <Input prefix={<UserOutlined />} size='large' value={'10000000'+id} style={{maxHeight: 50, marginRight: 16}} disabled/>
                <Input prefix={<KeyOutlined />}  size='large' value={role} style={{maxHeight: 50, marginLeft: 16}} disabled/>
              </div>
            </div>

            <div style={{display: 'flex', flex: 7, flexDirection: 'column', justifyContent: 'center'}}>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <p style={{flex: 1, fontSize: 20, marginRight: 16}}>Họ</p>
                <p style={{flex: 1, fontSize: 20, marginLeft: 16}}>Tên</p>
              </div>
              <div style={{display: 'flex', flex: 2, flexDirection: 'row'}}>
                <Input prefix={<UserOutlined />} size='large' value={firstName} style={{maxHeight: 50, marginRight: 16}} onChange={(data) => {setFirstName(data.target.value);setIsUpdateInfo(true);}}/>
                <Input prefix={<UserOutlined />} size='large' value={lastName} style={{maxHeight: 50, marginLeft: 16}} onChange={(data) => {setLastName(data.target.value);setIsUpdateInfo(true);}}/>
              </div>
            </div>

            <div style={{display: 'flex', flex: 7, flexDirection: 'column', justifyContent: 'center'}}>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <p style={{flex: 1, fontSize: 20, marginRight: 16}}>Số điện thoại</p>
                <p style={{flex: 1, fontSize: 20, marginLeft: 16}}>Email</p>
              </div>
              <div style={{display: 'flex', flex: 2, flexDirection: 'row'}}>
                <Input prefix={<PhoneOutlined />} size='large' value={phone} style={{maxHeight: 50, marginRight: 16}} onChange={(data) => {setPhone(data.target.value);setIsUpdateInfo(true);}}/>
                <Input prefix={<MailOutlined />} size='large' value={email} style={{maxHeight: 50, marginLeft: 16}} onChange={(data) => {setEmail(data.target.value);setIsUpdateInfo(true);}}/>
              </div>
            </div>

            <div style={{display: 'flex', flex: 7, flexDirection: 'column', justifyContent: 'center', marginBottom: 32}}>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                <p style={{flex: 1, fontSize: 20, marginRight: 16}}>Ngày sinh</p>
                <p style={{flex: 1, fontSize: 20, marginLeft: 16}}>Giới tính</p>
              </div>
              <div style={{display: 'flex', flex: 2, flexDirection: 'row'}}>
                <Input prefix={<CalendarOutlined />} size='large' value={birthday} style={{maxHeight: 50, marginRight: 16}} onChange={(data) => {setBirthday(data.target.value);setIsUpdateInfo(true);}}/>
                <Input prefix={<AuditOutlined />} size='large' value={gender} style={{maxHeight: 50, marginLeft: 16}} onChange={(data) => {setGender(data.target.value);setIsUpdateInfo(true);}}/>
              </div>
            </div>
          </div>
        </Content>
        <FooterContainer />
      </div>
    </Layout>
  );
}

const styleSheet = {
  avatar: {
    backgroundColor: "transparent",
    color: "#0958d9",
    fontSize: 24,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    margin: '16px 0 0 16px',
    minHeight: 500,
    borderRadius: 8,
    backgroundColor: Colors.bgAbove,
    flex: 6
  },
  footer: {
    margin: '0px 8px 0px 8px',
    textAlign: "center",
    fontSize: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  }
}

export default AccountPage;