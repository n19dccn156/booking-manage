import { AimOutlined, BankOutlined, CloseCircleFilled, FormOutlined, LoginOutlined, LogoutOutlined, PhoneOutlined, PlusOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { Badge, Button, Image, Input, Switch, Tag, Upload, Space } from "antd";
import { useState } from "react";
import Colors from "../../Constants/Colors";

const HotelContainer = () => {
  const [checked, setChecked] = useState(true)
  return (
    <div style={{ display: 'flex', flexDirection: 'row', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: Colors.bgAbove }}>
      <div style={{ display: 'flex', flex: 2, flexDirection: 'column', padding: 16 }}>
        <Image style={{ display: 'flex', borderRadius: 4 }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKmfwesfRNM7vLBp0rTjWpBBrZIkgi856UZw&usqp=CAU' />

        <div style={{ display: 'flex', position: 'absolute', flexDirection: 'row' }}>
          <Upload style={{ maxWidth: 50, maxHeight: 50 }} name="logo" action="/upload.do" listType="picture">
            <Button type='primary' style={{backgroundColor: '#722ed1'}} icon={<UploadOutlined />}>Thay đổi ảnh đại diện</Button>
          </Upload>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <div style={{ display: 'flex', flex: 2.8, justifyContent: 'space-around', alignItems: 'center', fontWeight: 'bold' }}>
            <Badge status='processing' color='green' text='Đang hoạt động'/>
            <Switch style={{backgroundColor: checked === true ? '#52c41a' : '#bfbfbf' }} checkedChildren="Mở" unCheckedChildren="Đóng" checked={checked} onClick={() => setChecked(!checked)} />
          </div>
          <Button danger style={{ marginLeft: 8 }} type='primary' icon={<SaveOutlined/>} disabled>Cập nhật</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 5 }} prefix={<BankOutlined style={{ color: '#bfbfbf' }} />} value='Khách sạn Phương Nam' readOnly />
          <Button style={{ marginLeft: 8 }} type='primary' icon={<FormOutlined/>}>Thay đổi</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 5 }} prefix={<AimOutlined style={{ color: '#bfbfbf' }} />} value='138 Hùng Vương, xã Ngũ Phụng, huyện Phú Quý, tỉnh Bình Thuận' readOnly />
          <Button style={{ marginLeft: 8 }} type='primary' icon={<FormOutlined/>}>Thay đổi</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 2.3 }} prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />} value='0334-428-102' readOnly />
          <Input style={{ display: 'flex', flex: 2.3 }} prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />} value='0252-3768-083' readOnly />
          <Button style={{ marginLeft: 8 }} type='primary' icon={<FormOutlined/>}>Thay đổi</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 2.3 }} prefix={<LoginOutlined style={{ color: '#bfbfbf' }} />} value='14h : 00' readOnly />
          <Input style={{ display: 'flex', flex: 2.3 }} prefix={<LogoutOutlined style={{ color: '#bfbfbf' }} />} value='12h : 00' readOnly />
          <Button style={{ marginLeft: 8 }} type='primary' icon={<FormOutlined/>}>Thay đổi</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16 }}>
          <Input style={{ display: 'flex', flex: 2.3 }} prefix={<AimOutlined style={{ color: '#bfbfbf' }} />} value='108.43765232' readOnly />
          <Input style={{ display: 'flex', flex: 2.3 }} prefix={<AimOutlined style={{ color: '#bfbfbf' }} />} value='10.123742942' readOnly />
          <Button style={{ marginLeft: 8 }} type='primary' icon={<FormOutlined/>}>Thay đổi</Button>
        </div>

      </div>
      <div style={{ display: 'flex', flex: 3, flexDirection: 'column' }}>
        <div style={{ display: 'flex', flex: 2, padding: '16px 16px', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold', fontSize: 16, color: '#001d66' }}>
              Danh sách tiện ích
              <Button style={{marginLeft: 24}} type='primary' icon={<PlusOutlined/>}>Thêm</Button>
            </div>
            <div style={{border: '2px solid rgb(0, 29, 102)', marginTop: 8 }}></div>
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
        <div style={{ display: 'flex', flex: 3, padding: '16px 16px', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold', fontSize: 16}}>
              Nội dung mô tả
              <Button style={{marginLeft: 24}} type='primary' icon={<FormOutlined/>}>Thay đổi</Button>
            </div>
            <div style={{ border: '2px solid rgb(0, 29, 102)', marginTop: 8 }}></div>
          </div>
          <Input.TextArea style={{display: 'flex', flex: 4, paddingBottom: 16 }} defaultValue='Desciption' />
        </div>
      </div>
    </div>
  );
}

export default HotelContainer;