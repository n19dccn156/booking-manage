import { useEffect, useState } from "react";
import StatusBoxComponent from "../../Components/DashBoardComponent/StatusBoxComponent";
import { Row } from 'antd';
import axios from "axios";
import Constants from "../../Constants/Constants";

const StatusContainer = () => {

  const [awai, setAwait] = useState(0);
  const [confirm, setConfirm] = useState(0);
  const [ongoing, setOngoing] = useState(0);
  const [complete, setComplete] = useState(0);
  const [cancel, setCancel] = useState(0);

  useEffect(() => {
    axios({
			method: 'GET',
			url: Constants.host + '/api/v1/order/group-status',
      headers: {'Authorization': localStorage.getItem('authorization')}
		})
    .then((res) => {      
      res.data.data.forEach((data) => {
        switch (data.statusId) {
          case Constants.STATUS.AWAIT:
            setAwait(data.quantity)
            break;
          case Constants.STATUS.COMFIRM:
            setConfirm(data.quantity)
            break;
          case Constants.STATUS.ONGOING:
            setOngoing(data.quantity)
            break;
          case Constants.STATUS.COMPLETE:
            setComplete(data.quantity)
            break;
          case Constants.STATUS.CANCEL:
            setCancel(data.quantity)
            break;
        
          default:
            break;
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
  })

  return (
    <div>
      <Row style={styleSheet.rowAbove}>
        <StatusBoxComponent color="#9254de" name="Chờ xác nhận" quantity={awai} linkNext="await" linkReload="RELOAD"/>
        <StatusBoxComponent color="#4096ff" name="Đặt thành công" quantity={confirm} linkNext="confirm" linkReload="RELOAD"/>
        <StatusBoxComponent color="#36cfc9" name="Đang diễn ra" quantity={ongoing} linkNext="ongoing" linkReload="RELOAD"/>
        <StatusBoxComponent color="#73d13d" name="Đã hoàn thành" quantity={complete} linkNext="complete" linkReload="RELOAD"/>
        <StatusBoxComponent color="#ff4d4f" name="Đã huỷ" quantity={cancel} linkNext="cancel" linkReload="RELOAD"/>
      </Row>
    </div>
  )
}

const styleSheet = {
  rowAbove: {
    display: "flex", 
    justifyContent: "space-evenly", 
    backgroundColor: '#f0f0f0', 
    borderTopLeftRadius: 8, 
    borderBottomLeftRadius: 8,
  }
}

export default StatusContainer;