import StatusBoxComponent from "../../Components/DashBoardComponent/StatusBoxComponent";
import { Row } from 'antd';

const StatusContainer = () => {
  return (
    <div>
      <Row style={styleSheet.rowAbove}>
        <StatusBoxComponent color="#9254de" name="Chờ xác nhận" quantity={2} linkNext="NEXT" linkReload="RELOAD"/>
        <StatusBoxComponent color="#4096ff" name="Đặt thành công" quantity={22} linkNext="NEXT" linkReload="RELOAD"/>
        <StatusBoxComponent color="#36cfc9" name="Đang diễn ra" quantity={10} linkNext="NEXT" linkReload="RELOAD"/>
        <StatusBoxComponent color="#73d13d" name="Đã hoàn thành" quantity={40} linkNext="NEXT" linkReload="RELOAD"/>
        <StatusBoxComponent color="#ff4d4f" name="Đã huỷ" quantity={102} linkNext="NEXT" linkReload="RELOAD"/>
      </Row>
    </div>
  )
}

const styleSheet = {
  rowAbove: {
    display: "flex", 
    justifyContent: "space-evenly", 
    backgroundColor: '#f0f0f0', 
    borderLeft: 8
  }
}

export default StatusContainer;