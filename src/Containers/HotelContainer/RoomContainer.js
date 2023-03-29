import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import RoomComponent from "../../Components/HotelComponent/RoomComponent";
import Colors from "../../Constants/Colors";

const RoomContainer = () => {
  return (
    <div style={{ display: 'flex', backgroundColor: Colors.bgAbove, flexDirection: 'column', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, marginTop: 16 }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '16px 16px 0 16px' }}>
        <div style={{ fontWeight: 'bold', fontSize: 16, color: '#001d66' }}>
          Danh sách phòng
          <Button style={{ marginLeft: 24 }} type='primary' icon={<PlusOutlined />}>Thêm</Button>
        </div>
        <div style={{ border: '2px solid rgb(0, 29, 102)', marginTop: 8 }}></div>
      </div>
      <Row>
        <Col span={12}><RoomComponent /></Col>
        <Col span={12}><RoomComponent /></Col>
      </Row>
      <Row>
        <Col span={12}><RoomComponent /></Col>
        <Col span={12}><RoomComponent /></Col>
      </Row>
      <Row>
        <Col span={12}><RoomComponent /></Col>
        <Col span={12}><RoomComponent /></Col>
      </Row>
    </div>
  );
}

export default RoomContainer;