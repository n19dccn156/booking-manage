import { BankOutlined, FieldNumberOutlined, FormOutlined, NumberOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { Badge, Button, Image, Input, Switch, Upload } from "antd";

const RoomComponent = () => {
  return (
    <div style={{ display: 'flex', margin: '16px 16px 32px 16px', backgroundColor: '#f5f5f5', borderRadius: 5 }}>
      <Image style={{ display: 'flex', flex: 1, maxWidth: 200, height: 200, borderRadius: 5, margin: '8px 8px 8px 8px' }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKmfwesfRNM7vLBp0rTjWpBBrZIkgi856UZw&usqp=CAU' />

      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '0 16px', justifyContent: 'space-evenly' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flex: 2.8, alignItems: 'center', fontWeight: 'bold', justifyContent: 'space-around' }}>
            <Badge status='processing' color='green' text='Đang hoạt động' />
            <Switch style={{ marginLeft: 32, backgroundColor: '#52c41a' }} checkedChildren="Mở" unCheckedChildren="Đóng" checked={true} onClick={() => { }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8 }}>
          <Input style={{ display: 'flex', flex: 5, fontSize: 16 }} prefix={<BankOutlined style={{ color: '#bfbfbf' }} />} value='Phòng giường đôi 2 người' readOnly />
          <Button style={{ marginLeft: 8 }} type='primary' icon={<FormOutlined />}></Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8 }}>
          <Input style={{ display: 'flex', flex: 3, fontSize: 16 }} prefix={<FieldNumberOutlined style={{ color: '#bfbfbf' }} />} value='3' readOnly />
          <Button style={{ marginLeft: 8 }} type='primary' icon={<FormOutlined />}></Button>
          <Input style={{ display: 'flex', flex: 5, fontSize: 16, marginLeft: 8 }} prefix={<NumberOutlined style={{ color: '#bfbfbf' }} />} value='300.000' readOnly />
          <Button style={{ marginLeft: 8 }} type='primary' icon={<FormOutlined />}></Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8, justifyContent: 'space-around' }}>
          <Upload style={{display: 'flex', flex: 1, maxHeight: 50 }} name="logo" action="/upload.do" listType="picture">
            <Button type='primary' style={{backgroundColor: '#08979c' }} icon={<UploadOutlined />}>Thay đổi ảnh đại diện</Button>
          </Upload>
          <Button danger type='primary' icon={<SaveOutlined />} disabled>Cập nhật</Button>
        </div>
      </div>
    </div>
  );
}

export default RoomComponent;