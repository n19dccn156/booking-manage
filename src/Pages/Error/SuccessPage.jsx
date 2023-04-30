import { Button, Col, Result, Steps } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div >
      <Col offset={4} span={16} order={4} style={{marginTop: 200}}>
        <Steps
          direction='horizontal'
          current={2}
          items={[
            { title: 'Đã hoàn thành', description: 'Chọn phòng' },
            { title: 'Đã hoàn thành', description: 'Xác nhận đơn đặt' },
            { title: 'Đã hoàn thành', description: 'Hoàn thành', }]} />
      </Col>

      <Result
        status="success"
        title="Đặt phòng thành công"
        subTitle="Chúc bạn có chuyến đi tuyệt vời !!"
        extra={[
          <Button type="primary" key='home' onClick={() => navigate('/home')}>
            Trang chủ
          </Button>,
        ]}
      />
    </div>
  )
}

export default SuccessPage;
