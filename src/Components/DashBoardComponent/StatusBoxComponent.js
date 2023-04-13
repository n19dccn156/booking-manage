import {
  RightCircleFilled,
  LeftCircleFilled,
} from '@ant-design/icons';
import { Typography } from 'antd';
import Colors from "../../Constants/Colors";
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const StatusBoxComponent = (props) => {
  const navigate = useNavigate()
  const click1 = () => {return navigate('/order/'+props.linkNext)}
  const click2 = () => {console.log(props.linkReload)}

  return (
    <div style={{display: "flex", width: 180, height: 100, margin: "12px 0 12px", backgroundColor: Colors.bgBelow}}>
      <div style={{flex:1, backgroundColor: props.color}}/>
      <div style={{display: "flex", flex: 16, flexDirection: "column"}}>
        <div style={{display: "flex", flex: 1, justifyContent: "center"}}>
          <Title style={{marginTop: 10}} level={5}>{props.name}</Title>
        </div>
        <div style={{display: "flex", flex: 2, justifyContent: "center"}}>
          <Title style={{marginTop: 10}} level={2}>{props.quantity}</Title>
        </div>
      </div>
      <div style={{display: "flex", flex:7, flexDirection: "column", borderTopRightRadius: 5, borderBottomRightRadius: 5}}>
        <div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
          <div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}><RightCircleFilled onClick={click1} style={{fontSize: 24, fontWeight: "bold", color: "#bfbfbf", cursor: "pointer"}}/></div>
        </div>
        <div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
          <div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}><LeftCircleFilled onClick={click2} style={{fontSize: 24, fontWeight: "bold", color: "#bfbfbf", cursor: "pointer"}}/></div>
        </div>
      </div>
    </div>
  );
}

export default StatusBoxComponent;